import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { IUserAddFav } from 'src/app/shared/interfaces/IUserAddFav';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  user!: User;
  movie!: Movie;
  videoUrl!: SafeResourceUrl;
  returnUrl = '/movie';
  updateUrl = '/update/';
  minutes!:Number;
  duration!:String;

  numberOfRatings = 0;
  movieId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router,

  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    activatedRoute.params.subscribe((params) => {
      if (params.id)
      this.movieId= params.id;
      console.log(this.movieId);
      movieService.getMovieByID(params.id).subscribe((serverMovie) => {
        this.movie = serverMovie;
        console.log(this.movie.id);
        this.minutes = this.movie.time;
        this.numberOfRatings=this.movie.numberOfReviews;
        this.duration = this.convertMinutesToHours(this.movie.time);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + this.movie.trailer
          );
        });
      });
  }
  ngOnInit(): void {}

  convertMinutesToHours(minutes:number):String{
    const hours = Math.floor(minutes/60);
    const resOfminutes = minutes%60;
    return `${hours}H ${resOfminutes}min`;
  }


  get isAdmin() {
    return this.user.isAdmin;
  }

  get isAuth(){
    return this.user.token;
  }

  deleteMovie() {
    if (confirm('Are you sure to delete this movie??')) {
      this.activatedRoute.params.subscribe((params) => {
        if (params.id)
          this.movieService.deleateMovie(params.id).subscribe((serverMovie) => {
            this.movie = serverMovie;
          });
      });
      this.router.navigateByUrl(this.returnUrl);
      alert('Movie deleted');
    }
  }

  updateMovie() {
    if (confirm('Are you sure to update info in this movie??')) {
      const newUpdateUrl = this.updateUrl + this.movie.id;
      //console.log(newUpdateUrl);
      this.router.navigateByUrl(newUpdateUrl);
    }
  }

  addToFavorits() {
    if (confirm('Are you sure to add this movie to your favourites??')) {
      this.activatedRoute.params.subscribe((params) => {
        if (params.id) {
          const addFav: IUserAddFav = {
            idMovie: params.id,
            idUser: this.user.id,
          };
          //console.log(addFav.idMovie,'idUser->',addFav.idUser);
          this.userService.addToFavorite(addFav).subscribe((serverUser) => {
            this.user = serverUser;
          });
        }
      });
    }
    //this.router.navigateByUrl('/movie');

  }

}
