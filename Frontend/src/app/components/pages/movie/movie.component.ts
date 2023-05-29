import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  user!:User;
  movies:Movie[] = [];
  favorite!:boolean;
  constructor( private movieService: MovieService,
     activatedRoute: ActivatedRoute,
     private userService:UserService){

      userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });


    let movieObsevable: Observable<Movie[]>;

    activatedRoute.params.subscribe((params)=> {
      if (params.searchTerm){
        movieObsevable = this.movieService.getAllMoviesBySearchTerm(params.searchTerm);
      }
      else{
        movieObsevable = this.movieService.getAll();
      }
      movieObsevable.subscribe((serverMovies) =>{
        this.fav();
        this.movies = serverMovies;
      });

      //console.log('here movie.component-> movies',this.movies);
    });

  }

  async getIdMovieFavorite(): Promise<string[]> {
    if (this.user.favorite) {
      const favoriteMovies = this.user.favorite;
      const idMovies = favoriteMovies.map((favorite) => favorite.idMovie);
      //console.log('here', idMovies);
      return idMovies;
    }
    return [];
  }

  fav(){
    let ids = this.getIdMovieFavorite().then((idMovies)=>{
      idMovies.forEach(id => {
        this.movies.forEach(movie =>{
          if (id == movie.id.toString()){
            return this.favorite = true;
          }
          else{
            return this.favorite = false;
          }
        })
      });
    }
    );
  }


  ngOnInit():void {

  }

}
