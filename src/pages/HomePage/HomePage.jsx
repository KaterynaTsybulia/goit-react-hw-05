import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../API/apiMovie.js";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <h2>Something went wrong, try again later</h2>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
