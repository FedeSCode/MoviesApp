import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit{

  user!:User;
  movie!: Movie;
  videoUrl!: SafeResourceUrl;
  returnUrl='/movie';
  updateUrl='/update/';




  constructor(
    private activatedRoute : ActivatedRoute,
    private movieService : MovieService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router:Router,

    ){
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });


    activatedRoute.params.subscribe((params) => {
      if(params.id)
        movieService.getMovieByID(params.id).subscribe(serverMovie =>{
          this.movie=serverMovie;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movie.trailer);
        });
      }
    );
  }


  ngOnInit(): void {

  }

  get isAdmin(){
    return this.user.isAdmin;
  }


  deleteMovie(){
    if(confirm('Are you sure to delete this movie??')){
      this.activatedRoute.params.subscribe((params) => {
        if(params.id)
        this.movieService.deleateMovie(params.id).subscribe(serverMovie =>{
            this.movie=serverMovie;
          });
        }
      );
      this.router.navigateByUrl(this.returnUrl);
      alert("Movie deleted");
    }
  }


  updateMovie(){
    if(confirm('Are you sure to update info in this movie??')){
      const newUpdateUrl =this.updateUrl+this.movie.id
      console.log(newUpdateUrl);
      this.router.navigateByUrl(newUpdateUrl);
    }
  }

}
