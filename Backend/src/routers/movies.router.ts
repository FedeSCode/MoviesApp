import {Router} from 'express';
import { sample_movies } from '../data';
import asyncHandler from 'express-async-handler';
import {Movies, MovieModel } from '../models/movies.model';
import { async } from 'rxjs';



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

router.post("/addMovie", asyncHandler(
    async (req, res) => {
    const {
      title,
      plot,
      poster,
      year,
      trailer,
      numberOfReviews,
      stars,
      favorite,
      director: {
        name: directorName ,
        photo: directorPhoto
      },
      screenwriters:{
        name: screenwritersName,
        photo: screenwritersPhoto
      },
      actors: {
        photo: actorPhoto,
        name: actorName,
        role: actorRole
      },
      streaming: {
        name: streamingName,
        url: streamingUrl
      }
    } = req.body;
  
    try {
      const movie = await MovieModel.findOne({ title });
      if (movie) {
        res.status(400).json({ message: 'Movie already exists' });
        return;
      }
      console.log(movie);
      const newMovie: Movies = ({
        id:'',
        title,
        plot,
        poster,
        year,
        trailer,
        numberOfReviews,
        stars,
        favorite,
        director: {
          name: directorName,
          photo: directorPhoto
        },
        screenwriters: {
          name: screenwritersName,
          photo: screenwritersPhoto
        },
        actors: {
            photo: actorPhoto,
            name: actorName,
            role: actorRole
        },
        streaming: {
          name: streamingName,
          url: streamingUrl
        }
      });
      const dbMovies = await MovieModel.create(newMovie);
      res.send(dbMovies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}));

router.patch("/update/:id", asyncHandler(
  async(req, res) =>{

  }
));

router.delete("/remove/:id", asyncHandler(
  async(req, res) =>{
    console.log(req.params.id);
    console.log(req.body);
    
  }
));


  

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