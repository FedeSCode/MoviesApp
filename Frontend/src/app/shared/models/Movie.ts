export class Movie{
  id!: number;
  title!: string;

  plot!: string;
  background!: string;
  poster!: string;
  year!: number;
  trailer!: string;
  numberOfReviews!: number;
  time!:number;
  stars!: number;
  favorite!: boolean;

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

  streaming!: {
    name:string;
    plataform:string;
    url:string
  }[];
  comments!:{
    userId:string;
    nameUser:string;
    rating:number;
    comment:string;
    spoil:boolean;
    likes:number;
    dislikes:number;
  }[];

}
