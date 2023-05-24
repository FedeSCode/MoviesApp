import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userName!: string;
  user!: User;

  constructor(private userService: UserService){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

  }

}
