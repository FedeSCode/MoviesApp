import { Component } from '@angular/core';

import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
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
  movie!: Movie;

  index!: number;

  isSubmitted= false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute:ActivatedRoute,

    ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });



  }



  get isAdmin(){
    return this.user.isAdmin;
  }

  get isAuth(){
    return this.user.token;
  }


}
