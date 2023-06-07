import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

import { UserService } from 'src/app/services/user.service';
import { IUserAddFav } from 'src/app/shared/interfaces/IUserAddFav';
import { IUserWatch } from 'src/app/shared/interfaces/IUserWatch';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'watched-button',
  templateUrl: './watched-button.component.html',
  styleUrls: ['./watched-button.component.scss']
})
export class WatchedButtonComponent {

  check='👁';
  // plus='⊕';
  plus='👁';

  movie!:Movie;

  @Input()
  id!: string;

  @Input()
  isFavorite: boolean = false;

  user!: User;

  @Output()
  onClick = new EventEmitter();

  moviesWatched!:number;
  watchedTime!:number;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private movieService:MovieService,
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.isFavoriteById();
  }

  addMyWatchedListAnyTime() {
    if (this.id) {
      const addFav: IUserAddFav = {
        idMovie: this.id,
        idUser: this.user.id,
      };
      this.userService.addToMyWatchedList(addFav).subscribe((serverUser) => {
        this.user = serverUser;
      });
    }
  }

  removeFromMyWatchedListAnyTime() {
      if (this.id) {
        const addFav: IUserAddFav = {
          idMovie: this.id,
          idUser: this.user.id,
        };
        this.userService.removeFromMyWatchedList(addFav).subscribe((serverUser) => {
          this.user = serverUser;
        });
      }
  }

  /*is fav*/
  async getIdMyWachedListMovies(): Promise<string[]> {
    const idFav = await this.userService.getMyWatchedListMovies(this.user.id).toPromise();
    let idMovies: string[] = [];
    this.moviesWatched = idMovies.length;
    if (Array.isArray(idFav)) {
      idMovies = idFav.map((watched) => watched.idMovie);
      this.moviesWatched =this.moviesWatched+1;
    }
    console.log(this.moviesWatched);
    return idMovies;
  }

  async isFavoriteById() {
    try {
      const idMovies = await this.getIdMyWachedListMovies();
      let isFavorite = false;
      idMovies.forEach((id) => {
        if (this.id === id) {
          isFavorite = true;
        }
      });
      this.isFavorite = isFavorite;
    } catch (error) {
      console.error(error);
    }
  }

  async recoverMovieTime(){
    this.movieService.getMovieByID(this.id).subscribe((serverMovie) => {
      this.movie = serverMovie;
      console.log(this.movie.id);
      this.watchedTime=this.movie.time;
      console.log('this.movie.time:',this.movie.time);
    });

  }

  removeToMoviesCounter(){
    this.recoverMovieTime();
    const time: IUserWatch ={
      idUser:this.user.id,
      timeWatchingMovies: this.movie.time,
    }
    console.log('removeeeTo',time);
    this.userService.removeWatchMoviesTime(time);
  }

  addToMoviesCounter(){
    this.recoverMovieTime();
    const time: IUserWatch ={
      idUser:this.user.id,
      timeWatchingMovies: this.movie.time,
    }
    console.log('adddd',time);
    this.userService.addWatchMoviesTime(time);
  }

  async removed(){
    this.isFavorite = false;
  }

  async added() {
    this.isFavorite = true;
  }

}
