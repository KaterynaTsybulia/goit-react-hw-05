import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

const Navigation = lazy(() => import('./components/Navigation/Navigation.jsx'))
const Home = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'))
const MovieDetails = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'))
const NotFound = lazy(()=> import('./pages/NotFoundPage/NotFoundPage.jsx'))
const MovieCast = lazy (() => import('./components/MovieCast/MovieCast.jsx'))
const MovieReviews = lazy(()=> import('./components/MovieReviews/MovieReviews.jsx'))



export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
}
