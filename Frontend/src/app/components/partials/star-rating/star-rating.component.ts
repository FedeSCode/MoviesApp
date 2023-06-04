import { Component, Input } from '@angular/core';


@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() maxRating = 5;
  @Input() valueOfStars!: number;
  @Input() icon = '★';
  @Input() numberOfRatings=20;

  @Input() justifyContent: 'left' | 'right' | 'center' = 'center';

  maxRatingArr: number[] = [];

  constructor() {}

  ngOnInit() {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  isStarFilled(index: number): boolean {
    return index <=  this.valueOfStars;
  }
}
