import React, { useEffect, useState } from "react";
import './MovieDetails.css'
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, apiKey]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      <Navbar />
      <main className="movie-details">
        {loading ? ( 
            <Skeleton type="movies-details"/>
        ) : !movie ? (
            <p>Movie not found</p>
        ) : (
        <div className="movie-details-container">
          <img src={movie.Poster} alt={movie.Title} />

          <div className="movie-info">
            <h1>{movie.Title}</h1>
            <p><strong>Release Date:</strong> {movie.Released}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MovieDetails;
