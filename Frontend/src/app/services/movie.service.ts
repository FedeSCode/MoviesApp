import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';
/*import { sample_movies } from 'src/data';*/
import { MOVIES_ADD_MOVIE_URL, MOVIES_BY_ID_URL, MOVIES_BY_SEARCH_URL, MOVIES_URL } from '../shared/constants/urls';
import { Movie } from '../shared/models/Movie';
import { IMovieAdd } from '../shared/interfaces/IMovieAdd';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http : HttpClient,
    private toastrService: ToastrService
    ) { }

  getAll(): Observable <Movie[]>{
    return this.http.get<Movie[]>(MOVIES_URL);
  }

  getAllMoviesBySearchTerm(searchTerm: string){
    return this.http.get<Movie[]>(MOVIES_BY_SEARCH_URL + searchTerm);
  }

  getMovieByID(movieId:string):Observable<Movie>{
    return this.http.get<Movie>(MOVIES_BY_ID_URL + movieId);
  }

  /**/

  addMovieToDb(addMovie: IMovieAdd): Observable<Movie> {
    return this.http.post<Movie>(MOVIES_ADD_MOVIE_URL, addMovie)
      .pipe(
        tap({
          next: (movie)=>{
            this.toastrService.success(
              `${movie.title} add to DB !!!`,
              'Succesfull !!'
            )
          },
          error: (errorResponse) =>{
            this.toastrService.error(errorResponse.error,'Register Failed')
          }
        })
      );
  }


}


/*
getAll(): Observable <Movie[]>{
  return this;
}


getAllMoviesBySearchTerm(SearchTerm: string){
  return this.getAll().filter(movie => movie.title.toLowerCase().includes(SearchTerm.toLowerCase()));
}



getMovieByID(movieId:number):Movie{
  return this.getAll().find(movie=> movie.id == movieId) ?? new Movie();
}
*/
