import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../API/apiMovie";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <h2>Something went wrong, try again later</h2>}
      <ul className={css.list}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={css.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://via.placeholder.com/250"
              }
              alt={actor.name}
              className={css.image}
            />
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}