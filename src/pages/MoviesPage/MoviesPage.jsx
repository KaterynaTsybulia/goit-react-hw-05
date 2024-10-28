import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../API/apiMovie";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await searchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const handleSubmit = (query) => {
    setSearchParams({ query });
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <h2>Something went wrong, try again later</h2>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
