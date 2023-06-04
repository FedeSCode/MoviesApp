import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-movies-watched-by-user',
  templateUrl: './movies-watched-by-user.component.html',
  styleUrls: ['./movies-watched-by-user.component.scss']
})
export class MoviesWatchedByUserComponent {
  minutes=0;
  filmsRegardes=0;
  user!:User;


  constructor(private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }




}
