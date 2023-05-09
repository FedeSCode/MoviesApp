import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/User';


const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  isAdminSubject!:boolean ;
  user!:any ;

  constructor(private http : HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
    this.user = this.userSubject.getValue();
    //console.log(this.user);
  }

  login(userLoging:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLoging).pipe(
      tap({
          next: (user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MoviesApp ${user.name}!!!`,
            'Login Successful'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Login failled');
        }
      })
    );
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const UserJson = localStorage.getItem(USER_KEY);
   /* console.log("UserJson: "+UserJson)*/
    if(UserJson) return JSON.parse(UserJson) as User;
    return new User();
  }

  register(UserRegister: IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, UserRegister).pipe(
      tap({
        next: (user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MoviesApp ${user.name}!!!`,
            'Register Succesfull !!'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error,'Register Failed')
        }

      }));

  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
}
