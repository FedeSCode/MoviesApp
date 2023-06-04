import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Favorite } from 'src/app/shared/models/Favorits';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorits.component.html',
  styleUrls: ['./favorits.component.scss'],
})
export class FavoritsComponent {
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


    const test =  this.getIdMovieFavorites();
    console.log( 'getIdMovieFavorites()',test);
    const test2 =  this.getIdMovieFavorites();
    console.log( 'getIdMovieFavorite()',test2);


    this.userService.userObservable.subscribe((newUser) => {
      this.getIdMovieFavorites().then((idMovies) => {
        console.log(idMovies);
        if(idMovies.length !== 0 ){
        this.getFavMoviesById(idMovies).subscribe((serverMovies) => {
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

  /*async getIdMovieFavorite(): Promise<string[]>{
    if (this.user.favorite) {
      const favoriteMovies = this.user.favorite;
      console.log(favoriteMovies);
      const idMovies = favoriteMovies.map((favorite) => favorite.idMovie);
      console.log('here', idMovies);
      return idMovies;
    }
    return [];
  }
  */

  async getIdMovieFavorites(): Promise<string[]> {
    const idFav = await this.userService.getFavorites(this.user.id).toPromise();
    console.log(idFav);
    let idMovies: string[] = [];
    if (Array.isArray(idFav)) {
      idMovies = idFav.map((favorite) => favorite.idMovie);
    }
    return idMovies;
  }

  getFavMoviesById(ids: string[]): Observable<Movie[]> {
    const movies: Observable<Movie>[] = ids.map((id) =>
      this.movieService.getMovieByID(id)
      );
      //console.log(this.movies);
    return forkJoin(movies);
  }
}
