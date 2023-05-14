import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { IMovieAdd } from 'src/app/shared/interfaces/IMovieAdd';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {

  user!:User;

  movieForm: FormGroup;
  index!: number;

  returnUrl:'';
  isSubmitted= false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    this.movieForm = this.fb.group({
      movieTitle:'',
      moviePlot:'',
      moviePoster:'',
      movieYear:'',
      movieIdThariler:'',
      movieNumberOfReviews:0,
      movieStars:0,
      movieDirectors: this.fb.array([this.fb.group({name: '', photo: ''})]),
      movieScreenwriters: this.fb.array([this.fb.group({name: '', photo: ''})]),
      movieActors: this.fb.array([this.fb.group({name: '', photo: '', role: ''})]),
      movieStreaming: this.fb.array([this.fb.group({name: '', url: ''})]),
      /*movieDirectors: this.fb.array([]),
      movieScreenwriters: this.fb.array([]),
      movieActors: this.fb.array([]),
      movieStreaming: this.fb.array([]),*/
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.movieForm.controls;
  }


  submit() {
    this.isSubmitted = true;
    if (this.movieForm.invalid) return;
    const fv = this.movieForm.value;
    const movie: IMovieAdd = {
      title: fv.movieTitle,
      plot: fv.moviePlot,
      poster: fv.moviePoster,
      year: fv.movieYear,
      trailer: fv.movieIdThariler,
      numberOfReviews: fv.movieNumberOfReviews,
      stars: fv.movieStars,
      favorite: false,
      director: {
        name: fv.movieDirectors.name,
        photo: fv.movieDirectors.photo
      },
      screenwriters: {
        name: fv.movieScreenwriters.name,
        photo: fv.movieScreenwriters.photo
      },
      actors: {
        name: fv.movieActors.name,
        photo: fv.movieActors.photo,
        role: fv.movieActors.role
      },
      streaming: {
        name: fv.movieStreaming.name,
        url: fv.movieStreaming.url
      }
    }

    this.movieService.addMovieToDb(movie).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }



  /*
  submit(){
    this.isSubmitted = true;
    if(this.movieForm.invalid) return;



    const fv= this.movieForm.value;
    const movie: IMovieAdd = {
      title: fv.movieTitle,
      plot: fv.moviePlot,
      poster: fv.moviePoster,
      year: fv.movieYear,
      trailer: fv.movieIdThariler,
      numberOfReviews: fv.movieNumberOfReviews,
      stars: fv.movieStars,
      favorite: false,
      director: fv.movieDirectors.getRawValue(),
      screenwriters: fv.movieScreenwriters.getRawValue(),
      actors: fv.movieActors.getRawValue(),
      streaming: fv.movieStreaming.getRawValue(),
    }

    this.movieService.addMovieToDb(movie).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }*/

  get movieDirectors(): FormArray {
    return this.movieForm.get('movieDirectors') as FormArray;
  }
  get movieScreenwriters(): FormArray {
    return this.movieForm.get('movieScreenwriters') as FormArray;
  }
  get movieActors(): FormArray {
    return this.movieForm.get('movieActors') as FormArray;
  }
  get movieStreaming(): FormArray {
    return this.movieForm.get('movieStreaming') as FormArray;
  }

  addDirector() {
    this.movieDirectors.push(this.fb.group({
      name: '',
      photo: ''
    }));
  }

  removeDirector(index: number) {
    this.movieDirectors.removeAt(index);
  }

  addScreenwriter() {
    this.movieScreenwriters.push(this.fb.group({
      name: '',
      photo: ''
    }));
  }

  removeScreenwriter(index: number) {
    this.movieScreenwriters.removeAt(index);
  }

  addActor() {
    this.movieActors.push(this.fb.group({
      photo: '',
      name: '',
      role:'',
    }));
  }

  removeActor(index: number) {
    this.movieActors.removeAt(index);
  }

  addStreaming() {
    this.movieStreaming.push(this.fb.group({
      name: '',
      url: '',
    }));
  }

  removeStreaming(index: number) {
    this.movieStreaming.removeAt(index);
  }


  get isAdmin(){
    return this.user.isAdmin;
  }

  get isAuth(){
    return this.user.token;
  }


}
