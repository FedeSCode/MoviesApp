import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  USER_ADD_FAVORITS_URL,
  USER_ADD_MOVIE_TO_MY_LIST_URL,
  USER_ADD_MOVIE_TO_MY_WATCHED_LIST_URL,
  USER_ADD_WATCH_MOVIES_TIME,
  USER_GET_FAVORIT_URL,
  USER_GET_MYLIST_MOVIES_URL,
  USER_GET_MYLIST_WATCHED_MOVIES_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
  USER_REMOVE_FAVORITE_URL,
  USER_REMOVE_MOVIE_FROM_MY_LIST_URL,
  USER_REMOVE_MOVIE_FROM_MY_WATCHED_LIST_URL,
  USER_REMOVE_WATCH_MOVIES_TIME,
} from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/User';
import { IUserAddFav } from '../shared/interfaces/IUserAddFav';
import { Favorite } from '../shared/models/Favorits';
import { IUserId } from '../shared/interfaces/IUserId';
import { IUserWatch } from '../shared/interfaces/IUserWatch';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  isAdminSubject!: boolean;
  user!: any;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
    this.user = this.userSubject.getValue();
    //console.log(this.user.id)
  }

  login(userLoging: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLoging).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          //console.log(user);
          this.toastrService.success(
            `Welcome to MoviesApp ${user.name}!!!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login failled');
        },
      })
    );
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const UserJson = localStorage.getItem(USER_KEY);
    /* console.log("UserJson: "+UserJson)*/
    if (UserJson) return JSON.parse(UserJson) as User;
    return new User();
  }

  register(UserRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, UserRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MoviesApp ${user.name}!!!`,
            'Register Succesfull !!'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  addToFavorite(userFav: IUserAddFav) {
    //console.log(USER_ADD_FAVORITS_URL, userFav);
    return this.http.post<User>(USER_ADD_FAVORITS_URL, userFav);
  }

  addToMyList(userFav: IUserAddFav) {
    //console.log(USER_ADD_MOVIE_TO_MY_LIST_URL, userFav);
    return this.http.post<User>(USER_ADD_MOVIE_TO_MY_LIST_URL, userFav);
  }

  removeFromFavorite(userFav: IUserAddFav) {
    // console.log(USER_REMOVE_FAVORITE_URL, userFav);
    return this.http.post<User>(USER_REMOVE_FAVORITE_URL, userFav);
  }

  removeFromMyList(userFav: IUserAddFav) {
    const test = this.http.post<User>(
      USER_REMOVE_MOVIE_FROM_MY_LIST_URL,
      userFav
    );
    return this.http.post<User>(USER_REMOVE_MOVIE_FROM_MY_LIST_URL, userFav);
  }

  getFavorites(id: string) {
    const userid: IUserId = {
      idUser: id,
    };
    return this.http.get<Favorite>(USER_GET_FAVORIT_URL.concat(id));
  }

  getMyListMovies(id: string) {
    const userid: IUserId = {
      idUser: id,
    };
    return this.http.get<Favorite>(USER_GET_MYLIST_MOVIES_URL.concat(id));
  }

  addToMyWatchedList(userFav: IUserAddFav) {
    //console.log(USER_ADD_MOVIE_TO_MY_WATCHED_LIST_URL, userFav);
    return this.http.post<User>(USER_ADD_MOVIE_TO_MY_WATCHED_LIST_URL, userFav);
  }

  removeFromMyWatchedList(userFav: IUserAddFav) {
    return this.http.post<User>(
      USER_REMOVE_MOVIE_FROM_MY_WATCHED_LIST_URL,
      userFav
    );
  }

  getMyWatchedListMovies(id: string) {
    const userid: IUserId = {
      idUser: id,
    };
    return this.http.get<Favorite>(
      USER_GET_MYLIST_WATCHED_MOVIES_URL.concat(id)
    );
  }

  addWatchMoviesTime(time: IUserWatch) {
    console.log('-->', USER_ADD_WATCH_MOVIES_TIME, time);
    return this.http.post<User>(USER_ADD_WATCH_MOVIES_TIME, time);
  }

  removeWatchMoviesTime(time: IUserWatch) {
    console.log('-->', USER_REMOVE_WATCH_MOVIES_TIME, time);
    return this.http.post<User>(USER_REMOVE_WATCH_MOVIES_TIME, time);
  }
}
