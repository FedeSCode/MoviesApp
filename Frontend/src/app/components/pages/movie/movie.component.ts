import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/models/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  movies:Movie[] = [];
  constructor( private movieService: MovieService, activatedRoute: ActivatedRoute){
    let movieObsevable: Observable<Movie[]>;

    activatedRoute.params.subscribe( (params)=> {
      if (params.searchTerm){
        movieObsevable = this.movieService.getAllMoviesBySearchTerm(params.searchTerm);
      }
      else{
        movieObsevable = this.movieService.getAll();

      }

      movieObsevable.subscribe((serverMovies) =>{
        this.movies = serverMovies;
      });

    });
  }



  ngOnInit():void {

  }

}
