import { Component, Input } from '@angular/core';

@Component({
  selector: 'movies-time',
  templateUrl: './movies-time.component.html',
  styleUrls: ['./movies-time.component.scss']
})
export class MoviesTimeComponent {
  @Input()
  minutes:number=0;

  time!:string;

  constructor(){

  }

  ngOnInit(): void {
    this.time = this.minutesToDaysHoursMinutes(this.minutes)
  }

  minutesToDaysHoursMinutes(minutes:number):string {
    const minutesInAnHour = 60;
    const minutesInADay = minutesInAnHour * 24;
    console.log(minutesInADay);
    const minutesInAMonth = minutesInAnHour * 30;

    const months = Math.floor(minutes / minutesInAMonth);
    const days = Math.floor((minutes % minutesInAMonth) / 1440);
    const hours = Math.floor(((minutes % minutesInAMonth)% minutesInADay) / 60);
    const remainingMinutes = minutes % minutesInAnHour;
    return `${months}M ${days}J ${hours}H ${remainingMinutes}MIN`;
  }

}
