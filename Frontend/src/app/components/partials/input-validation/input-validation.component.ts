import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any= {
  required:'Shoud not be empty',
  email:'Must be a valid email',
  minLenght:'Field is too short',
  notMatch: 'Password and Confirm not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit,OnChanges {

  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;

  errorMessages : string[]=[];

  constructor(){}

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidator();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidator();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidator()
  }



checkValidator(){
  const errors = this.control.errors;
  if(!errors){
    this.errorMessages = [];
    return;
  }

  const errorsKeys= Object.keys(errors);
  this.errorMessages = errorsKeys.map(key => VALIDATORS_MESSAGES[key]);
}

}
