/*When is in a real server it will change to appName.Domain.com */
const BASE_URL = 'http://localhost:5000';

/*CRUD*/
export const MOVIES_URL = BASE_URL + '/api/movies';
export const MOVIES_BY_SEARCH_URL = MOVIES_URL + '/search/';
export const MOVIES_BY_ID_URL = MOVIES_URL + '/';

export const MOVIES_ADD_MOVIE_URL =  MOVIES_URL + '/addMovie';
export const MOVIES_UPDATE_MOVIE_BY_ID_URL =  MOVIES_URL + '/update/';
export const MOVIES_REMOVE_MOVIE_BY_ID_URL =  MOVIES_URL + '/remove/';




export const USER_LOGIN_URL= BASE_URL +'/api/users/login';
export const USER_REGISTER_URL= BASE_URL +'/api/users/register';
