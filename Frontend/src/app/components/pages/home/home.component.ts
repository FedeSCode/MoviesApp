import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user!:User;
  movies:Movie[] = [];
  bigMovies:Movie[] = [];
  favorite!:boolean;

  moviesCarousel :Movie[] = [];

  poster!:string;
  title!:string;
  trailer!:string;
  idMovie!:string;


  constructor( private movieService: MovieService,
     activatedRoute: ActivatedRoute,
     private userService:UserService){

      userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });


    let movieObsevable: Observable<Movie[]>;
    let carrouselObsevable : Observable<Movie[]>;

    activatedRoute.params.subscribe((params)=> {
      if (params.searchTerm){
        movieObsevable = this.movieService.getAllMoviesBySearchTerm(params.searchTerm);
      }
      else{
        movieObsevable = this.movieService.getAll();
      }
      movieObsevable.subscribe((serverMovies) =>{
        this.movies = serverMovies;
        this.bigMovies = serverMovies;
      });

      this.getFourRandomMovies();
      console.log('this.getFourRandomMovies();: ')

      //console.log('here movie.component-> movies',this.movies);
    });

  }

  private getFourRandomMovies(): Movie[] {
    const moviesCarousel: Movie[] = [];

    this.movies.forEach((movie: Movie) => {
      if (movie.stars >= 4) {
        moviesCarousel.push(movie);
        if (moviesCarousel.length >= 6) {
          moviesCarousel.forEach((carouselMovie: Movie) => {
            if (carouselMovie.stars < 4) {
              const index = moviesCarousel.indexOf(carouselMovie);
              moviesCarousel.splice(index, 1);
            }
          });
        }
      }
    });
    console.log(moviesCarousel);
    return moviesCarousel;
  }





  ngOnInit():void {
    this.moviesCarousel = this.getFourRandomMovies();
  }

}
