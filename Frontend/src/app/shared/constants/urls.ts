/*When is in a real server it will change to appName.Domain.com */
import {environment} from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';

/*CRUD*/
export const MOVIES_URL = BASE_URL + '/api/movies';
export const MOVIES_BY_SEARCH_URL = MOVIES_URL + '/search/';
export const MOVIES_BY_ID_URL = MOVIES_URL + '/';

export const MOVIES_ADD_MOVIE_URL =  MOVIES_URL + '/addMovie';
export const MOVIES_UPDATE_MOVIE_BY_ID_URL =  MOVIES_URL + '/update/';
export const MOVIES_REMOVE_MOVIE_BY_ID_URL =  MOVIES_URL + '/remove/';



/*User */
export const USER_URL= BASE_URL +'/api/users';
export const USER_LOGIN_URL= USER_URL +'/login';
export const USER_REGISTER_URL= USER_URL +'/register';
export const USER_ADD_FAVORITS_URL= USER_URL +'/addFavorite'
;


/*Fav */
export const Favorite_URL = BASE_URL + '/api/favorites';


