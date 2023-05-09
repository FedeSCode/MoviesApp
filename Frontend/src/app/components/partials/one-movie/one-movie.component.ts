import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'one-movie',
  templateUrl: './one-movie.component.html',
  styleUrls: ['./one-movie.component.scss']
})
export class OneMovieComponent {

  @Input()
  id!:string;

  @Input()
  img!:string;

  @Input()
  title!:string;

  @Input()
  favorite!:boolean;

  @Input()
  starsNumber!:number;


  constructor(){
  }

  onStarClick(event: Event) {
    event.stopPropagation();
  }
}
