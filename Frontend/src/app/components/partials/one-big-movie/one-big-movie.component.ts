import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'one-big-movie',
  templateUrl: './one-big-movie.component.html',
  styleUrls: ['./one-big-movie.component.scss']
})
export class OneBigMovieComponent {
  @Input()
  movies: Movie[] = [];

  @Input()
  indicators = true;

  movieTrailer = ''
  selectedIndex = 0;

  videoUrl!: SafeResourceUrl ;
  user!: User ;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  get isAuth(): boolean {
    return !!this.user?.token;
  }

  selectedMovie(index:number):void{
    this.selectedIndex = index;
  }

  getTrailerId(trailer:string):SafeResourceUrl{
    console.log(trailer);
    this.movieTrailer = trailer;
    const videoUrl = 'https://www.youtube.com/embed/' + trailer;
    console.log(videoUrl)
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

}
