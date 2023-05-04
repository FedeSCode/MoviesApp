import { Schema, model } from "mongoose";

export interface Movies {
  id: string;
  title: string;
  
  director: {
    photo: string;
    name: string;
  };

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
    plataform:string;
    url:string
  }[];
  plot: string;
  poster: string;
  year: number;
  trailer: string;
  reviews: string;
  

  stars: number;
  favorite: boolean;
}

export const MovieSchema = new Schema<Movies>(
  {
    title: String,
    director: [
      {
        photo: String,
        name: String,
      },
    ],
    screenwriters: [
      {
        photo: String,
        name: String,
      },
    ],
    actors: [
      {
        photo: String,
        name: String,
        role: String,
      },
    ],
    streaming: [
      {
        name:String,
        platform: String,
        url: String,
      },
    ],
    plot: String,
    poster: String,
    year: String,
    trailer: String,
    reviews: String,
    stars: Number,
    favorite: Boolean,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const MovieModel = model<Movies>("movies", MovieSchema);
