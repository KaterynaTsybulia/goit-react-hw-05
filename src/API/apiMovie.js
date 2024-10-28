import axios from "axios";


const options = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTRjMmYwZTUwZThmMjJiNGUxMjUzZmNjYTA2Y2ZjOSIsIm5iZiI6MTcyOTg4MTM1OS4yMDM2NTYsInN1YiI6IjY3MWJjNmZlMWVhMzM5MjgyOTdkMzZkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j-l7L6mHMxAllwYiieWqhQPpiQQJdPbDh7sFX6nqzYU'
  },
});


export const getTrendingMovies = async () => {
  const response = await options.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await options.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await options.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await options.get(`/movie/${movieId}/credits`);
  return response.data.cast; 
};

export const getMovieReviews = async (movieId) => {
  const response = await options.get(`/movie/${movieId}/reviews`);
  return response.data.results;

};