
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", //base url in Axios for all movies, the starting point for all the movies.
});

export default instance;



//axios.js....we use js for data