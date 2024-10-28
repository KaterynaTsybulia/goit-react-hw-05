import { Link, Outlet } from "react-router-dom";
import css from "./MoviesCard.module.css";

export default function MoviesCard({
  poster_path,
  title,
  release_date,
  origin_country,
  vote_average,
  overview,
  genres,
  onGoBack,
}) {
  const defaultImg = "https://via.placeholder.com/250";

  return (
    <div className={css.container}>
      <button onClick={onGoBack} className={css.backButton}>
        Go back
      </button>

      <div className={css.cardInfo}>
        <img
          className={css.image}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          alt={title || "Movie poster"}
        />
        <div>
          <h2>{title || "Title not found"}</h2>
          <p className={css.dataMovie}>
            <span>Release date: </span>
            {release_date || "Sorry, not found"}
          </p>
          <p className={css.dataMovie}>
            <span>Country: </span>
            {origin_country.length > 0
              ? origin_country.join(", ")
              : "Sorry, not found"}
          </p>
          <p className={css.dataMovie}>
            <span>Vote average: </span>
            {vote_average || "Not available"}
          </p>
          <p className={css.dataMovie}>
            <span>Overview: </span>
            {overview || "Sorry, not found"}
          </p>
          <p className={css.dataMovie}>
            <span>Genres: </span>
            {genres.length > 0
              ? genres.map(({ name }) => name).join(", ")
              : "Sorry, not found"}
          </p>
        </div>
      </div>
      <nav className={css.movieNav}>
        <Link to="cast" className={css.link}>
          Cast
        </Link>
        <Link to="reviews" className={css.link}>
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
