export interface IMovieAdd{
  id: string;
  title: string;
  director: {
    photo: string;
    name: string;
  }
  screenwriters: {
    photo: String;
    name: String;
  };
  actors: {
    photo: String;
    name: String;
    role: String;
  };
  streaming: {
    name:string;
    url:string
  }[];
  plot: string;
  poster: string;
  year: number;
  trailer: string;
  numberOfReviews: number;
  stars: number;
  favorite: boolean;
}
