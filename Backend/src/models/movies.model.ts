import { Schema, model } from "mongoose";

export interface Movies {
  id: string;
  title: string;
  plot: string;
  poster: string;
  year: number;
  trailer: string;
  stars: number;
  numberOfReviews: number;
  favorite: boolean;
  time:number;
  director: [{
    photo: string;
    name: string;
  }];
  screenwriters:[ {
    photo: String;
    name: String;
  }];
  actors:[ {
    photo: String;
    name: String;
    role: String;
  }];  
  streaming:[{
    name:string;
    url:string
  }];
  comments:[{
    userId:String;
    nameUser:String;
    rating: number;
    comment:String;
  }];
  

}

export const MovieSchema = new Schema<Movies>(
  {
    title: String,
    plot: String,
    poster: String,
    year: Number,
    trailer: String,
    numberOfReviews:Number,
    stars: Number,
    favorite: Boolean,    
    time:Number,
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
    comments:[
      {
      userId:String,
      nameUser:String,
      rating: Number,
      comment:String,   
      },
   ],    

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
