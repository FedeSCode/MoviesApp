import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

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

  user!:User;

  constructor(userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  get isAuth(){
    return this.user.token;
  }





  onStarClick(event: Event) {
    event.stopPropagation();
  }

}
