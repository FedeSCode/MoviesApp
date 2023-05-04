import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/models/Movie';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit{

  movie!: Movie;
  videoUrl!: SafeResourceUrl;



  constructor(activatedRoute : ActivatedRoute, movieService : MovieService,    private sanitizer: DomSanitizer
    ){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        movieService.getMovieByID(params.id).subscribe(serverMovie =>{
          this.movie=serverMovie;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movie.trailer);
        });
      }
    );
  }


  ngOnInit(): void {

  }

}
