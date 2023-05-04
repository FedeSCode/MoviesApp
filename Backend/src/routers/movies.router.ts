import {Router} from 'express';
import { sample_movies } from '../data';
import asyncHandler from 'express-async-handler';
import { MovieModel } from '../models/movies.model';



const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const moviesCounts = await MovieModel.countDocuments();
        if(moviesCounts>0){
            res.send("Seed is already done!");
            return;
        }
        await MovieModel.create(sample_movies);
        res.send("Seed is done!");
    }
))

/*Base de donnes */

router.get("/", asyncHandler(
    async(req, res) =>{
        const movies = await MovieModel.find();
        res.send(movies);
    }

))


router.get("/search/:searchTerm", asyncHandler(
    async (req, res) =>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const movies = await  MovieModel.find({title: {$regex:searchRegex}});
        res.send(movies)
    })
)

router.get("/:movieId",asyncHandler(
    async (req,res) =>{        
        const movie = await MovieModel.findById(req.params.movieId);
        res.send(movie);
    }
)
)

router.post("add/movie"), asyncHandler(
    async (req, res) => {
        const movie = req.body;
    }
)

/*
*sans base des donnes*
router.get("/", (req, res) =>{
    res.send(sample_movies)
})


router.get("/search/:searchTerm", (req, res) =>{
    const searchTerm = req.params.searchTerm;
    const movies = sample_movies
    .filter(movie => movie.title.toLowerCase()
    .includes(searchTerm.toLowerCase()));;
    res.send(movies)
})

router.get("/:movieId",(req,res) =>{
    const movieId = req.params.movieId;
    const movie =sample_movies.find(movie=> movie.id == movieId);
    res.send(movie);
})
*/
export default router;