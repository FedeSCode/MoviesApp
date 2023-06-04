import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';
/*import { sample_movies } from 'src/data';*/
import { Movie } from '../shared/models/Movie';
import { IMovieAdd } from '../shared/interfaces/IMovieAdd';
import { ToastrService } from 'ngx-toastr';

import {
  COMMENT_ADD_COMMENT_URL,
  MOVIES_ADD_MOVIE_URL,
  MOVIES_BY_ID_URL,
  MOVIES_BY_SEARCH_URL,
  MOVIES_REMOVE_MOVIE_BY_ID_URL,
  MOVIES_UPDATE_MOVIE_BY_ID_URL,
  MOVIES_URL,
} from '../shared/constants/urls';
import { IComment } from '../shared/interfaces/IComment';

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
            this.toastrService.error('Register Failed')
          }
        })
      );
  }

  deleateMovie(movieId:string):Observable<Movie>{
    return this.http.delete<Movie>(MOVIES_REMOVE_MOVIE_BY_ID_URL+movieId);
  }

  //@TODO
  updateMovie(movieId:string, movie:IMovieAdd){
    //console.log('Movie service: movieId ', movieId, 'update: ',movie);
    return this.http.patch<Movie>(MOVIES_UPDATE_MOVIE_BY_ID_URL+movieId,movie);
  }

  addCommentToDb(addComment:IComment){
    // console.log(addComment);
    return this.http.post<IComment>(COMMENT_ADD_COMMENT_URL, addComment).pipe(
      tap({
        next: (comment)=>{
          this.toastrService.success(
            `Comment add to DB !!!`,
            'Succesfull !!'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error('Comment not posted')
        }
      })
    );
  }

}

