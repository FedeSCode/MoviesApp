export class User{
  id!:string;
  email!:string;
  name!:string;
  password!:string;
  token!:string;
  isAdmin!:boolean;
  timeWatchingMovies!:number;
  numMoviesWatched!:number;
  favorite!: {
    idMovie:string;
  }[];
}
