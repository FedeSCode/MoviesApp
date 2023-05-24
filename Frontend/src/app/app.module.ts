import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/partials/nav/nav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FourOhFourComponent } from './components/pages/four-oh-four/four-oh-four.component';
import { FavoritsComponent } from './components/pages/favorits/favorits.component';
import { MovieComponent } from './components/pages/movie/movie.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { SearchComponent } from './components/partials/search/search.component';
import { MoviePageComponent } from './components/pages/movie-page/movie-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/partials/title/title.component';
import { ToastrModule }  from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AddMovieComponent } from './components/pages/add-movie/add-movie.component';
import { OneMovieComponent } from './components/partials/one-movie/one-movie.component';
import { SideBackgroundComponent } from './components/partials/side-background/side-background.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { MovieFormComponent } from './components/partials/movie-form/movie-form.component';
import { ProfileComponent } from './components/pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MovieComponent,
    HomeComponent,
    AboutComponent,
    FourOhFourComponent,
    FavoritsComponent,
    MovieComponent,
    FooterComponent,
    SearchComponent,
    MoviePageComponent,
    LoginPageComponent,
    TitleComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    AddMovieComponent,
    OneMovieComponent,
    SideBackgroundComponent,
    StarRatingComponent,
    MovieFormComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
