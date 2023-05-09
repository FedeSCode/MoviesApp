import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent  implements OnInit {

  @Input()
  type: 'submit' | 'button' = 'submit';
  @Input()
  text: string ='Submit';
  @Input()
  bgColor = '#04efff';
  @Input()
  color = '#000';
  @Input()
  fontSizeRem= 1.3;
  @Input()
  widthRem= 8;

  @Output()
  onClick = new EventEmitter();

  constructor(){

  }
  ngOnInit(): void {
  }


}
