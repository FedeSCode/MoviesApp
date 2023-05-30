import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
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


  constructor(private userService: UserService,
    private movieService: MovieService){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    this.userService.userObservable.subscribe((newUser) => {
      this.getIdMovieFavorite().then((idMovies) => {
        if(idMovies.length !== 0 ){
        this.getFavMoviesById(idMovies).subscribe((serverMovies) => {
          this.movies = serverMovies;
          console.log(this.movies);
        });
        }
      });
      this.user = newUser;
    });
  }

  ngOnInit():void {

  }

  async getIdMovieFavorite(): Promise<string[]> {
    if (this.user.favorite) {
      const favoriteMovies = this.user.favorite;
      const idMovies = favoriteMovies.map((favorite) => favorite.idMovie);
      console.log('here', idMovies);
      return idMovies;
    }
    return [];
  }

  getFavMoviesById(ids: string[]): Observable<Movie[]> {
    const movies: Observable<Movie>[] = ids.map((id) =>
      this.movieService.getMovieByID(id)
    );
    return forkJoin(movies);

  }

}
