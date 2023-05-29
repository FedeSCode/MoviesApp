import mongoose, {Schema, model} from "mongoose";
import { Movies } from "./movies.model";


export interface Favorite {
    id: string;
    idUser: string;
    favorite: {
      idMovie: string;
    };
}
    

export const FavoritesSchema = new Schema<Favorite>(
    {
        idUser: String,
        favorite: [
            {
              idMovie: String
            },
        ],
    }
);

export const FavoriteModel = model<Favorite>("favorite", FavoritesSchema);
