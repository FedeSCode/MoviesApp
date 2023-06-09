import { Component } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { IMovieAdd } from 'src/app/shared/interfaces/IMovieAdd';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})


export class UpdateMovieComponent {

  user!:User;
  movie!:Movie;

  movieId!:'';
  movieForm: FormGroup;
  index!: number;

  returnUrl:'/movie/';
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

    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.movieId = params.id;
      movieService.getMovieByID(this.movieId).subscribe(serverMovie =>{
        this.movie=serverMovie;
      });
    }
    );

    this.movieForm = this.fb.group({
      movieTitle: "",
      moviePlot:"",
      movieBackground:"",
      moviePoster:'',
      movieYear:'',
      movieIdThariler:'',
      movieNumberOfReviews:0,
      movieStars:0,
      movieTime:0,
      movieDirectors: this.fb.array([this.fb.group({name:'', photo:''})]),
      movieScreenwriters: this.fb.array([this.fb.group({name:'', photo:''})]),
      movieActors: this.fb.array([this.fb.group({name:'', photo:'', role:''})]),
      movieStreaming: this.fb.array([this.fb.group({name:'', url:''})]),

    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }



  ngOnInit() {
    this.movieService.getMovieByID(this.movieId).subscribe((movieToUpdate) => {
      this.movie = movieToUpdate;
      this.movieForm.patchValue({
        movieTitle: movieToUpdate.title,
        moviePlot: movieToUpdate.plot,
        movieBackground: movieToUpdate.background,
        moviePoster: movieToUpdate.poster,
        movieYear: movieToUpdate.year,
        movieIdThariler: movieToUpdate.trailer,
        movieNumberOfReviews: 0,
        movieStars: movieToUpdate.stars,
        movieTime: movieToUpdate.time,
      });

      // Pré-remplir les réalisateurs
      this.movieDirectors.clear();
      movieToUpdate.director.forEach((director) => {
        this.movieDirectors.push(this.fb.group({
          name: director.name,
          photo: director.photo
        }));
      });


    this.movieScreenwriters.clear();
    movieToUpdate.screenwriters.forEach((screenwriter) => {
      this.movieScreenwriters.push(this.fb.group({
        name: screenwriter.name,
        photo: screenwriter.photo
      }));
    });

    this.movieActors.clear();
    movieToUpdate.actors.forEach((actor) => {
      this.movieActors.push(this.fb.group({
        name: actor.name,
        photo: actor.photo,
        role: actor.role
      }));
    });

    this.movieStreaming.clear();
    movieToUpdate.streaming.forEach((stream) => {
      this.movieStreaming.push(this.fb.group({
        name: stream.name,
        url: stream.url
      }));
    });
  });
  }




  get fc(){
    return this.movieForm.controls;
  }

  submit() {
    console.log(`here:`, this.movieForm.value);

    this.isSubmitted = true;
    if (this.movieForm.invalid) return;
    const fv = this.movieForm.value;

    const movie: IMovieAdd = {
      title: fv.movieTitle,
      plot: fv.moviePlot,
      background: fv.movieBackground,
      poster: fv.moviePoster,
      year: fv.movieYear,
      trailer: fv.movieIdThariler,
      time : fv.movieTime,
      numberOfReviews: fv.movieNumberOfReviews,
      stars: this.movie.stars,
      favorite: this.movie.favorite,
      director: fv.movieDirectors.map((d: any) => ({name: d.name, photo: d.photo})),
      screenwriters: fv.movieScreenwriters.map((s: any) => ({name: s.name, photo: s.photo})),
      actors: fv.movieActors.map((a: any) => ({name: a.name, photo: a.photo, role: a.role})),
      streaming: fv.movieStreaming.map((s: any) => ({name: s.name, url: s.url})),
      };

      console.log(`Updated movie:`,movie)
      this.movieService.updateMovie(this.movieId,movie).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });

  }


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
