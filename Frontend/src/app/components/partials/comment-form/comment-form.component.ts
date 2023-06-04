import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {

  icon='★';

  idMovie!:String;

  user!: User;

  ratingvalue='';

  isSubmitted= false;
  commentForm: FormGroup;
  returnUrl = '/movie';

  constructor(private fb: FormBuilder,
    private movieService: MovieService,
    private userService:UserService,
    private router: Router,
    activatedRoute:ActivatedRoute,
    ){
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      //console.log(this.user.id);
      });

      activatedRoute.params.subscribe((params) => {
        if (params.id)
        this.idMovie= params.id;
        console.log(this.idMovie);
      });



    console.log(this.idMovie);

    this.commentForm = this.fb.group({
      idMovie:this.idMovie,
      userId:this.user.id,
      nameUser:this.user.name,
      rating:'',
      comment:''
    });
  }

  get fc(){
    return this.commentForm.controls;
  }

  submit() {

    this.isSubmitted = true;
    if (this.commentForm.invalid) return;
    const fv = this.commentForm.value;

    const comment: IComment = {
      idMovie: fv.idMovie,
      userId: fv.userId,
      nameUser: fv.nameUser,
      rating: fv.rating,
      comment: fv.comment
    };
    console.log(`here:`, this.commentForm.value);
    console.log(`New commnet:`,comment)
    this.movieService.addCommentToDb(comment).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
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
