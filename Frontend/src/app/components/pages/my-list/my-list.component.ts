import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Favorite } from 'src/app/shared/models/Favorits';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent {
  user!: User;
  movies : Movie[]=[];
  userId = '';
  fav!: Favorite;

  constructor(private userService: UserService,
    private movieService: MovieService){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.userId = newUser.id;
      console.log('laaaaaa ->',this.userId);
    });


    this.userService.userObservable.subscribe((newUser) => {
      this.getIdMovieMyList().then((idMovies) => {
        console.log(idMovies);
        if(idMovies.length !== 0 ){
        this.getMyListMoviesById(idMovies).subscribe((serverMovies) => {
          this.movies = serverMovies;
          //console.log(this.movies);
        });
        }
      });
      this.user = newUser;
    });
  }

  ngOnInit():void {

  }

  async getIdMovieMyList(): Promise<string[]> {
    const idFav = await this.userService.getMyListMovies(this.user.id).toPromise();
    console.log(idFav);
    let idMovies: string[] = [];
    if (Array.isArray(idFav)) {
      idMovies = idFav.map((myList) => myList.idMovie);
    }
    return idMovies;
  }

  getMyListMoviesById(ids: string[]): Observable<Movie[]> {
    const movies: Observable<Movie>[] = ids.map((id) =>
      this.movieService.getMovieByID(id)
      );
      //console.log(this.movies);
    return forkJoin(movies);
  }



}
