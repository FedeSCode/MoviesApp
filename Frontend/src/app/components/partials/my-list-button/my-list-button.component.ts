import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserAddFav } from 'src/app/shared/interfaces/IUserAddFav';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'my-list-button',
  templateUrl: './my-list-button.component.html',
  styleUrls: ['./my-list-button.component.scss']
})
export class MyListButtonComponent {
  @Input()
  id!: string;

  @Input()
  isFavorite: boolean = false;

  user!: User;

  @Output()
  onClick = new EventEmitter();

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      //console.log(this.user.id);
    });
    this.isFavoriteById();
    console.log(this.isFavorite);
    //this.isFavorite = this.isFavoriteById();
  }

  addMyListAnyTime() {
    if (this.id) {
      const addFav: IUserAddFav = {
        idMovie: this.id,
        idUser: this.user.id,
      };
      this.userService.addToMyList(addFav).subscribe((serverUser) => {
        this.user = serverUser;
      });
    }
    this.router.navigateByUrl('/movie');
  }

  removeFromMyListAnyTime() {
      if (this.id) {
        const addFav: IUserAddFav = {
          idMovie: this.id,
          idUser: this.user.id,
        };
        this.userService.removeFromMyList(addFav).subscribe((serverUser) => {
          this.user = serverUser;
        });
      }
      this.router.navigateByUrl('/movie');
  }

  /*is fav*/
  async getIdMyListMovies(): Promise<string[]> {
    const idFav = await this.userService.getMyListMovies(this.user.id).toPromise();
    console.log(idFav);
    let idMovies: string[] = [];
    if (Array.isArray(idFav)) {
      idMovies = idFav.map((favorite) => favorite.idMovie);
    }
    return idMovies;
  }

  async isFavoriteById() {
    try {
      const idMovies = await this.getIdMyListMovies();
      let isFavorite = false;
      idMovies.forEach((id) => {
        if (this.id === id) {
          isFavorite = true;
        }
      });
      this.isFavorite = isFavorite;
    } catch (error) {
      console.error(error);
    }
  }

}
