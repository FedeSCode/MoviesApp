import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent {
  movieForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      movieTitle:'',
      moviePlot:'',
      moviePoster:'',
      movieYear:'',
      movieIdThariler:'',
      movieNumberOfReviews:0,
      movieStars:0,
      movieDirectors: this.fb.array([]),
      movieScreenwriters: this.fb.array([]),
      movieActors: this.fb.array([]),
      movieStreaming: this.fb.array([]),
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
  /* Add a new input box*/
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

  onSubmit() {
    console.log(this.movieForm.value);
  }
  /*------------------------------ */

}
