import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/models/Movie';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() maxRating = 5;
  @Input() valueOfStars!: number;
  @Input() icon = '★';

  maxRatingArr: number[] = [];

  constructor() {}

  ngOnInit() {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  isStarFilled(index: number): boolean {
    return index <= this.valueOfStars;
  }
}
