import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../API/apiMovie";
import Loader from "../../components/Loader/Loader";
import MoviesCard from "../../components/MoviesCard/MoviesCard";

export default function MovieDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const goBackClick = useRef(location.state?.from || "/");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(goBackClick.current);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <h2>Something went wrong, try again later</h2>}
      {movie && <MoviesCard {...movie} onGoBack={handleGoBack} />}
    </>
  );
}
