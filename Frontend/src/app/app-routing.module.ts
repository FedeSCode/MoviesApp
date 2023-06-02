import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { AddMovieComponent } from './components/pages/add-movie/add-movie.component';
import { FavoritsComponent } from './components/pages/favorits/favorits.component';
import { FourOhFourComponent } from './components/pages/four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MoviePageComponent } from './components/pages/movie-page/movie-page.component';
import { MovieComponent } from './components/pages/movie/movie.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { UpdateMovieComponent } from './components/pages/update-movie/update-movie.component';
import { MyListComponent } from './components/pages/my-list/my-list.component';

const routes: Routes = [
  /*nav pages*/
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'favorits', component: FavoritsComponent },
  { path: 'myList', component: MyListComponent },
  { path: 'profile', component: ProfileComponent },

  /*movie pages*/
  { path: 'movie', component: MovieComponent },
  { path:'search/:searchTerm', component: MovieComponent},
  { path: 'movie/:id', component: MoviePageComponent},
  { path: 'addMovie', component: AddMovieComponent},
  { path: 'update/:id', component:UpdateMovieComponent},

  /*login*/
  { path: 'login', component: LoginPageComponent},
  /*register*/
  { path: 'register', component: RegisterPageComponent},

  /*error pages*/
  { path: 'not-found', component: FourOhFourComponent},
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
