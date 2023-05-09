import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {

  movieForm: FormGroup;
  index!: number;

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

}
