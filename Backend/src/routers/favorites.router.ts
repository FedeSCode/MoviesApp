import {Router} from 'express';
import { sample_favorite } from '../data';
import asyncHandler from 'express-async-handler';
import { async } from 'rxjs';
import { FavoriteModel } from '../models/favorites.model';



const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) => {
        const moviesCounts = await FavoriteModel.countDocuments();
        if(moviesCounts>0){
            res.send("Seed is already done!");
            return;
        }
        await FavoriteModel.create(sample_favorite);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async(req, res) =>{
        const favorites = await FavoriteModel.find();
        res.send(favorites);
    }

))



export default router;
