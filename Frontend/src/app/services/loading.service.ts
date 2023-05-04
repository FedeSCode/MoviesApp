import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private  isLoadingSub = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  showLoading(){
    this.isLoadingSub.next(true);
  }

  hideLoading(){
    this.isLoadingSub.next(false);
  }

  get isLoading() {
    return this.isLoadingSub.asObservable();
  }


}
