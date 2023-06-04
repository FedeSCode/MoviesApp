import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  @Input()
  idMovie!:String;
  @Input()
  userId!:String;
  @Input()
  nameUser!:String;
  @Input()
  comment!:String;
  @Input()
  rating!:number;

  user!: User;



  constructor(private fb: FormBuilder,
    private movieService: MovieService,
    private userService:UserService,
    private router: Router,
    ){
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      //console.log(this.user.id);
      });
  }

  onStarClick(event: Event) {
    event.stopPropagation();
  }

  get isAuth(){
    /*console.log(this.user.token);*/
    return this.user.token;
  }

}
