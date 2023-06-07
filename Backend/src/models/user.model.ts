import {Schema, model} from "mongoose";

export interface User{
    id: string;
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
    timeWatchingMovies:Number;
    numMoviesWatched:Number;
    moviesWatched:{
        idMovie:string;
    }[]
    favorite: {
      idMovie: string;
    }[];
    myList: {
      idMovie: string;
    }[];
  
}

export const UserSchema = new Schema<User>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    timeWatchingMovies:{type: Number, default: 0},
    numMoviesWatched:{type: Number, default: 0},
    moviesWatched:{
        type: [{
            idMovie: String,
        }],
        default: [],
    },
    favorite: {
        type: [{
            idMovie: String,
        }],
        default: [],
    },
    myList: {
        type: [{
            idMovie: String,
        }],
        default: [],
    },
    
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
}
)
  

export const UserModel= model<User>('user',UserSchema);