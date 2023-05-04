import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  user!:User;
  constructor(private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {

  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){

    /*console.log(">"+this.user)*/
    /*console.log(">"+this.user.token)*/
    return this.user.token;
  }

  get isAdmin(){
    /*console.log(this.user.isAdmin)*/
    return true;
  }
}
