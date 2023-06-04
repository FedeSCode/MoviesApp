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

  movieId!: String;

  isSubmitted= false;
  commentForm: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,

  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      //console.log(this.user.id);
    });

    activatedRoute.params.subscribe((params) => {
      if (params.id)
      this.movieId= params.id;
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

      this.commentForm = this.fb.group({
        idMovie:this.movieId,
        userId:this.user.id,
        nameUser:this.user.name,
        rating:'',
        comment:''
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
    /*console.log(this.user.token);*/
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


  /*comments */

  onStarClick(event: Event) {
    event.stopPropagation();
  }

  get fc(){
    return this.commentForm.controls;
  }

  submit() {

    this.isSubmitted = true;
    if (this.commentForm.invalid) return;
    const fv = this.commentForm.value;

    const comment: IComment = {
      idMovie: fv.idMovie,
      userId: fv.userId,
      nameUser: fv.nameUser,
      rating: fv.rating,
      comment: fv.comment
    };
    console.log(`here:`, this.commentForm.value);
    console.log(`New commnet:`,comment)
    this.movieService.addCommentToDb(comment).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });






  }
}
