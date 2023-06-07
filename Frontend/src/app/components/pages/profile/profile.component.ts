import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user!: User;
  minutes= 0;
  filmsRegardes=0;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.minutes = this.user.timeWatchingMovies;
      this.filmsRegardes= this.user.numMoviesWatched;
      this.minutes= this.user.timeWatchingMovies;
    })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

  get isAdmin(){
    return this.user.isAdmin;
  }

}
