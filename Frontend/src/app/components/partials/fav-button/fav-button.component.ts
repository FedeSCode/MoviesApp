import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserAddFav } from 'src/app/shared/interfaces/IUserAddFav';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss'],
})
export class FavButtonComponent {
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
    //console.log(this.isFavorite);
    //this.isFavorite = this.isFavoriteById();
  }

  /*addToFavorits() {
    if (confirm('Are you sure to add this movie to your favourites??')) {
      this.activatedRoute.params.subscribe((params) => {
        if (params.id) {
          const addFav: IUserAddFav = {
            idMovie: params.id,
            idUser: this.user.id,
          };
          this.userService.addToFavorite(addFav).subscribe((serverUser) => {
            this.user = serverUser;
          });
        }
      });
    }
  }*/

  addToFavoritsAnyTime() {
    // if (confirm('Are you sure to add this movie to your favourites??')) {
    if (this.id) {
      const addFav: IUserAddFav = {
        idMovie: this.id,
        idUser: this.user.id,
      };
      this.userService.addToFavorite(addFav).subscribe((serverUser) => {
        this.user = serverUser;
      });
    }

    // }
  }

  removeFromFavoritsAnyTime() {
    // if (confirm('Are you sure to remove this movie to your favourites??')) {
      if (this.id) {
        const addFav: IUserAddFav = {
          idMovie: this.id,
          idUser: this.user.id,
        };
        this.userService.removeFromFavorite(addFav).subscribe((serverUser) => {
          this.user = serverUser;
        });
      }
  }

  /*is fav*/
  async getIdMovieFavorites(): Promise<string[]> {
    const idFav = await this.userService.getFavorites(this.user.id).toPromise();
    //console.log(idFav);
    let idMovies: string[] = [];
    if (Array.isArray(idFav)) {
      idMovies = idFav.map((favorite) => favorite.idMovie);
    }
    return idMovies;
  }

  async isFavoriteById() {
    try {
      const idMovies = await this.getIdMovieFavorites();
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

  async removed(){
    this.isFavorite = false;
  }

  async added() {
    this.isFavorite = true;
  }
}
