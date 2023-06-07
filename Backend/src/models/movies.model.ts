import { Schema, model } from "mongoose";

export interface Movies {
  id: string;
  title: string;
  background: string;
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
  comments:{
    userId:String;
    nameUser:String;
    comment:String;
    rating: number;
    spoil:boolean;
    likes:number,
    dislikes:number,
    replay:{
      replay_userId:String;
      replay_nameUser:String;
      replay_comment:String;
      replay_spoil:boolean;
      replay_likes:number,
      replay_dislikes:number,
      }[];
  }[];

}

export const MovieSchema = new Schema<Movies>(
  {
    title: String,
    background:String,
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
      spoil:Boolean,
      likes:Number,
      dislikes:Number,
      replay:{
        type:[{
          replay_userId:String,
          replay_nameUser:String,
          replay_comment:String,
          replay_spoil:Boolean,
          replay_likes:Number,
          replay_dislikes:Number,
        }],
        default:[],
      }
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
