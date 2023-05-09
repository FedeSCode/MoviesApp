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
        url: String,
      },
    ],
    plot: String,
    poster: String,
    year: String,
    trailer: String,
    numberOfReviews:Number,
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
