import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";

import { dbConnect } from './configs/database.config';

/*routers*/
import moviesRouter from './routers/movies.router';
import usersRouter from "./routers/users.router";
import favoritesRouter from './routers/favorites.router';


dbConnect();

const app = express();
const port = 5000;

app.use(express.json());

app.use(cors({
    credentials: true,
    origin : ["http://localhost:4200"]
}));


app.use("/api/movies", moviesRouter);
app.use("/api/users", usersRouter);
app.use("/api/favorites", favoritesRouter);


app.listen(port, ()=> {
    console.log(`Server running on port http://localhost:${port}`);
})