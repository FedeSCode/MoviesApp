import {Router} from 'express';
import { sample_movies } from '../data';
import asyncHandler from 'express-async-handler';
import {Movies, MovieModel } from '../models/movies.model';



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


router.post('/addMovie', async (req, res) => {
  try {
    const movieData = req.body; 

    const newMovie = new MovieModel({
      title: movieData.title,
      plot: movieData.plot,
      poster: movieData.poster,
      year: movieData.year,
      trailer: movieData.trailer,
      time:movieData.time,
      numberOfReviews: movieData.numberOfReviews,
      stars: movieData.stars,
      favorite: false,
      director: movieData.director,
      screenwriters: movieData.screenwriters,
      actors: movieData.actors,
      streaming: movieData.streaming,
      comments:movieData.comments
    });

    // Enregistrer le nouveau film dans la base de données
    const dbMovies = await MovieModel.create(newMovie);
    res.send(dbMovies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/addComment', async (req, res) => {
  try {
    const commentData = req.body;
    console.log('commentData.comment:', commentData.comment);

    const movie = await MovieModel.findById(commentData.idMovie);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.comments.push({
      userId: commentData.userId,
      nameUser: commentData.nameUser,
      rating: commentData.rating,
      comment: commentData.comment
    });
    
    console.log('-----------------> ',movie.comments);
    await movie.save();

    res.status(200).json({ message: "Comment added successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*
router.patch("/update/:id", asyncHandler(
  async(req, res) =>{
    const movieId = req.params.id;
    const updatedMovie = req.body;

    try{
      const movie = await MovieModel.findByIdAndUpdate(movieId, updatedMovie);

      if(!movie){
        return res.status(404).json({message: "Movie not found"});
      }
      await movie.save();
      res.status(200).json({message:"Film mis a jour", movie: movie});
    }catch(error){
      console.log(error);
      res.status(500).json({message:"Une error lors de la missse a jour du film"});
    }
  }
));*/

router.patch("/update/:id", async (req, res) => {
  const movieId = req.params.id;
  const updatedMovie = req.body;

  try {
    const movie = await MovieModel.findByIdAndUpdate(movieId, updatedMovie, { new: true });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie sucsefuly updated", movie: movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while movie updating" });
  }

  return; 
});


router.delete("/remove/:id", asyncHandler(
  async (req, res) => {
  //console.log(req.params.id);
  const result = await MovieModel.findByIdAndDelete(req.params.id);
  //console.log("result"+result);
  if (result) {
    res.send({ "status": true, "message": "Movie Deleted!!" });
  } else {
    res.send({ "status": false, "message": "Movie not deleted!!" });
  }
}));



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