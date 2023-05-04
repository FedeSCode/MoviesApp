export class Movie{
  id!: number;
  title!: string;

  director!: {
    photo: string;
    name: string;
  }[];

  screenwriters!: {
    photo: string;
    name: string;
  }[];

  actors!: {
    photo: string;
    name: string;
    role: string;
  }[];

  plot!: string;
  poster!: string;
  year!: number;
  trailer!: string;
  reviews!: string;

  streaming!: {
    name:string;
    plataform:string;
    url:string
  }[];

  stars!: number;
  favorite!: boolean;

}
