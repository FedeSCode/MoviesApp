import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StarRatingService {

  constructor(private http: HttpClient) { }

  getRating(id: number): Observable<number> {
  }

}
