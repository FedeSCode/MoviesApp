import { Component, Input } from '@angular/core';

@Component({
  selector: 'movies-watched',
  templateUrl: './movies-watched.component.html',
  styleUrls: ['./movies-watched.component.scss']
})
export class MoviesWatchedComponent {
  @Input()
  counter=0;

  constructor(){
  }



}
