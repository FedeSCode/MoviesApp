/*When is in a real server it will change to appName.Domain.com */
import {environment} from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';
//const BASE_URL = 'http://localhost:5000';

/*CRUD*/
export const MOVIES_URL = BASE_URL + '/api/movies';
export const MOVIES_BY_SEARCH_URL = MOVIES_URL + '/search/';
export const MOVIES_BY_ID_URL = MOVIES_URL + '/';

export const MOVIES_ADD_MOVIE_URL =  MOVIES_URL + '/addMovie';
export const MOVIES_UPDATE_MOVIE_BY_ID_URL =  MOVIES_URL + '/update/';
export const MOVIES_REMOVE_MOVIE_BY_ID_URL =  MOVIES_URL + '/remove/';

export const COMMENT_ADD_COMMENT_URL =  MOVIES_URL + '/addComment';




/*User */
export const USER_URL= BASE_URL +'/api/users';
export const USER_LOGIN_URL= USER_URL +'/login';
export const USER_REGISTER_URL= USER_URL +'/register';
export const USER_ADD_FAVORITS_URL= USER_URL +'/addFavorite'
export const USER_ADD_MOVIE_TO_MY_LIST_URL= USER_URL +'/addToMyList';
export const USER_REMOVE_FAVORITE_URL= USER_URL +'/removeFavorite';
export const USER_REMOVE_MOVIE_FROM_MY_LIST_URL= USER_URL +'/removeMovieFromList';
export const USER_GET_MYLIST_MOVIES_URL= USER_URL +'/getMyListMovies/';
export const USER_GET_FAVORIT_URL= USER_URL +'/getFavorite/';

export const USER_ADD_MOVIE_TO_MY_WATCHED_LIST_URL = USER_URL + "/addToMyWatchedList";
export const USER_REMOVE_MOVIE_FROM_MY_WATCHED_LIST_URL = USER_URL + "/removeFromMyWatchedList";
export const USER_GET_MYLIST_WATCHED_MOVIES_URL = USER_URL + "/getMyWatchedListMovies/";

export const USER_ADD_WATCH_MOVIES_TIME = USER_URL + "/addWatchMoviesTime";
export const USER_REMOVE_WATCH_MOVIES_TIME = USER_URL + "/removeWatchMoviesTime";


/*Fav */
export const Favorite_URL = BASE_URL + '/api/favorites';


