import {Schema, model} from "mongoose";

export interface User{
    id:string;
    email:string;
    password:string;
    name:string;
    isAdmin:boolean;  
    favorite: [{
        idMovie: string;
    }];    
}

export const UserSchema = new Schema<User>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    favorite: [{
        idMovie: String,
        },
    ],
    
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