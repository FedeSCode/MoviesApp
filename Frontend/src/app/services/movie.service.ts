import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*import { sample_movies } from 'src/data';*/
import { MOVIES_BY_ID_URL, MOVIES_BY_SEARCH_URL, MOVIES_URL } from '../shared/constants/urls';
import { Movie } from '../shared/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http : HttpClient) {  }

  getAll(): Observable <Movie[]>{
    return this.http.get<Movie[]>(MOVIES_URL);
  }

  getAllMoviesBySearchTerm(searchTerm: string){
    return this.http.get<Movie[]>(MOVIES_BY_SEARCH_URL + searchTerm);
  }

  getMovieByID(movieId:string):Observable<Movie>{
    return this.http.get<Movie>(MOVIES_BY_ID_URL + movieId);
  }

  /*addMovieToDb()*/

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
