import axios from "axios";



// BASE DA URL: https://api.themoviedb.org/3
//URL DA API:movie/550?api_key=dbd37c97d13a1b17d5d483057c2735a3

//dbd37c97d13a1b17d5d483057c2735a3

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;


