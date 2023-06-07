import Router from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const router = Router();

let __USER__ID__ =  '';

//console.log('__USER__ID__ : ' ,__USER__ID__);


router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCounts = await UserModel.countDocuments();
    if (userCounts > 0) {
      res.send("Seed is already done!");
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done!");
  })
  );
  
  router.get("/", asyncHandler(
    async(req, res) =>{
      const user = await UserModel.find();
      res.send(user);
  }

))

router.get("/user/:id", asyncHandler(
  async(req, res)=>{
    const user = await UserModel.findById(req.params.id);
    res.send(user);
  }
))

router.get("/getFavorite/:id", asyncHandler( 
  async(req,res)=>{
  // console.log('passe par la');
  const { idUser } = req.body
  const user = await UserModel.findById(req.params.id);
  // console.log('user userrouter', user)
  if(user){
    const listFav = user.favorite;
    //console.log('listFavorite : ' , listFav);

    res.send(listFav);
  }
  /*donne un tableau de id*/
  /*if (user) {
    const listFav = user.favorite.map(item => item.idMovie);
    console.log('listFavorite:', listFav);
    res.send(listFav);
  }*/
  })
)

router.get("/getMyListMovies/:id", asyncHandler( 
  async(req,res)=>{
  const { idUser } = req.body
  const user = await UserModel.findById(req.params.id);
  //console.log('user userrouter', user)
  if(user){
    const listFav = user.myList;
    //console.log('myListMovies : ' , listFav);

    res.send(listFav);
  }
  })
)

router.get("/getMyWatchedListMovies/:id", asyncHandler( 
  async(req,res)=>{
  const { idUser } = req.body
  const user = await UserModel.findById(req.params.id);
  if(user){
    const listFav = user.moviesWatched;
    res.send(listFav);
  }
  })
)

/*Database*/

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(401).send("User not found");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send("User already exists, please login!!");
      return;
    }

    const encyptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: '',
      name,
      email: email.toLowerCase(),
      password: encyptedPassword,
      isAdmin: false,
      timeWatchingMovies:0,
      numMoviesWatched:0,
      moviesWatched:[],
      favorite: [],
      myList: [],
    };

    const dbUser = await UserModel.create(newUser);

    res.send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id, 
      email:user.email, 
      isAdmin: user.isAdmin
    },
    "SomeRandomText",
    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    timeWatchingMovies: user.timeWatchingMovies,
    numMoviesWatched:user.numMoviesWatched,
    moviesWatched: user.moviesWatched,
    favorite: user.favorite,
    myList: user.myList,
    token: token,
  };
};

router.post("/addFavorite", async (req, res, next) => {
  const { idMovie, idUser } = req.body;

  try {
    // Rechercher l'utilisateur par son ID
    //console.log("hereeeee");
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const existingFavorite = user.favorite.find(
      (favorite) => favorite.idMovie === idMovie
    );
    if (existingFavorite) {
      return res
        .status(409)
        .json({
          message: "Le film est déjà dans les favoris de l'utilisateur",
        });
    }
    user.favorite.push({ idMovie });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du favori" });
  }
});

router.post("/addToMyList", async (req, res, next) => {
  const { idMovie, idUser } = req.body;
  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const existingFavorite = user.myList.find(
      (myList) => myList.idMovie === idMovie
    );
    if (existingFavorite) {
      return res
        .status(409)
        .json({
          message: "Le film est déjà dans les favoris de l'utilisateur",
        });
    }
    user.myList.push({ idMovie });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout a ma liste" });
  }
});

router.post("/addToMyWatchedList", async (req, res, next) => {
  const { idMovie, idUser } = req.body;
  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const existingFavorite = user.moviesWatched.find(
      (watched) => watched.idMovie === idMovie
    );

   
    if (existingFavorite) {
      return res
        .status(409)
        .json({
          message: "Le film est déjà dans les favoris de l'utilisateur",
        });
    }
    user.moviesWatched.push({ idMovie });
    let num = user.numMoviesWatched.valueOf();
    //console.log ('numero des filmes vues', num);
    num = num +1;
   //console.log ('numero des filmes vues', num);
    user.numMoviesWatched = num;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de film regarde" });
  }
});


router.post("/removeFavorite", async (req, res) => {
  const { idMovie, idUser } = req.body;

  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const existingFavoriteIndex = user.favorite.findIndex(
      (favorite) => favorite.idMovie === idMovie
    );

    if (existingFavoriteIndex === -1) {
      return res
        .status(404)
        .json({ message: "Le film n'est pas dans les favoris de l'utilisateur" });
    }

    user.favorite.splice(existingFavoriteIndex, 1);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du favori" });
  }
});

router.post("/removeMovieFromList", async (req, res) => {
  const { idMovie, idUser } = req.body;

  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const existingFavoriteIndex = user.myList.findIndex(
      (myList) => myList.idMovie === idMovie
    );

    if (existingFavoriteIndex === -1) {
      return res
        .status(404)
        .json({ message: "Le film n'est pas dans Ma liste de l'utilisateur" });
    }

    user.myList.splice(existingFavoriteIndex, 1);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de ma liste" });
  }
});


router.post("/removeFromMyWatchedList", async (req, res) => {
  const { idMovie, idUser } = req.body;
  //console.log('idMovie:>>', idMovie, 'idUser:>>', idUser);
  
  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const existingFavoriteIndex = user.moviesWatched.findIndex(
      (watched) => watched.idMovie === idMovie
    );

    if (existingFavoriteIndex === -1) {
      return res
        .status(404)
        .json({ message: "Le film n'est pas dans Ma liste de l'utilisateur" });
    }

    user.moviesWatched.splice(existingFavoriteIndex, 1);
    let num = user.numMoviesWatched.valueOf();
    num = num - 1;
    user.numMoviesWatched = num;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de ma liste" });
  }
});

router.post('/addWatchMoviesTime', async (req, res) => {
  const { idUser, timeWatchingMovies } = req.body;
  console.log("idUser>>>>: ", idUser, "timeWatchingMovies>>>>: ", timeWatchingMovies);
  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (timeWatchingMovies <= 0) {
      return res.status(400).json({ message: "Le temps de visionnage des films doit être un nombre positif." });
    }

    const newTimeWatchingMovies = user.timeWatchingMovies + timeWatchingMovies;

    user.timeWatchingMovies = newTimeWatchingMovies;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du temps de visionnage des films" });
  }
});


router.post("/removeWatchMoviesTime", async (req, res) => {
  const { idUser, timeWatchingMovies } = req.body;

  console.log("idUser>>>>: ", idUser, "timeWatchingMovies>>>>: ", timeWatchingMovies);

  try {
    const user = await UserModel.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (timeWatchingMovies <= 0) {
      return res.status(400).json({ message: "Le temps de visionnage des films doit être un nombre positif." });
    }

    const newTimeWatchingMovies = user.timeWatchingMovies.valueOf() - timeWatchingMovies;

    user.timeWatchingMovies = newTimeWatchingMovies;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du temps de visionnage des films" });
  }
});







export default router;


/*
router.post("/login", (req, res)=>{
    const body = req.body;
    const user = sample_users.find(user => user.email === body.email && user.password === body.password);
    
    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(401).send("User not found");
    }
})
*/
