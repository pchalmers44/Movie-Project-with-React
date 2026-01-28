import React, { useEffect, useState } from "react";
import './Movies.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

  const query = new URLSearchParams(useLocation().search).get("q");
  const navigate = useNavigate();

  const apiKey = "48429509"

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=48429509&s=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, apiKey]);

   const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/movies?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <>
      <Navbar />
      <main className="movies-page">
        <div className="movies-search">
          <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder="Search Movies or Keywords"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {query && <h2>Search Results for "{query}"</h2>}

        {loading ? (
          <div className="movie-list">
            <Skeleton type="movie-card" count={6} />
          </div>
        ) : movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
        <div className="movie-list">
          {movies.slice(0, 6).map((movie) => (
            <Link
              to={`/movies/${movie.imdbID}`}
              className="movie-card-link"
              key={movie.imdbID}
              >
            <div className="movie-card" key={movie.imdbID}>
              <div className="movie-card__container">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                  alt={movie.Title}
                />
              </div>
            </div>
             </Link>
          ))}
        </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;


