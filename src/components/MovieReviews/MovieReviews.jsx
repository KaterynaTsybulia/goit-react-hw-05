import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../API/apiMovie";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
          setIsLoading(true);
          try {
            const data = await getMovieReviews(movieId);
            setReviews(data);
          } catch (error) {
            setError(error.message || "Something went wrong");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchReviews();
      }, [movieId]);

    return (
        <div>
          {isLoading && <Loader />}
          {error && <h2>Something went wrong, try again later</h2>}
          {reviews.length === 0 && !isLoading && <p>We do not have any reviews for this movie.</p>}
          <ul className={css.list}>
            {reviews.map((review) => (
              <li key={review.id} className={css.item}>
                <h3 className={css.name}>Author: {review.author}</h3>
                <p className={css.character}>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      );
}