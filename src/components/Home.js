import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import List from "./List";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { options } from "../api.js";
import { getYear } from "../utils";
import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies.");
        return response.json();
      })
      .then((data) => setMovies(data.results || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function openModal(movie) {
    navigate("/modal", {
      state: { previousLocation: location, movie },
    });
  }

  if (loading) {
    return (
      <div className="browse-state">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading movies…</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="browse-state">
        <p className="browse-state__message browse-state__message--error">{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="browse-state">
        <p className="browse-state__message">No movies found.</p>
      </div>
    );
  }

  const featured = movies[0];
  const backdropUrl = featured.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280/${featured.backdrop_path}`
    : null;

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="hero"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined}
        aria-label={`Featured: ${featured.title}`}
      >
        <div className="hero__gradient" />
        <div className="hero__gradient--side" />
        <div className="hero__content">
          <h1 className="hero__title">{featured.title}</h1>
          <div className="hero__meta">
            {featured.release_date && (
              <span>{getYear(featured.release_date)}</span>
            )}
            {featured.vote_average > 0 && (
              <span className="hero__rating">
                ★ {featured.vote_average.toFixed(1)}
              </span>
            )}
          </div>
          {featured.overview && (
            <p className="hero__overview">{featured.overview}</p>
          )}
          <div className="hero__actions">
            <button
              className="btn-play"
              onClick={() => navigate(`/watch/${featured.id}`)}
            >
              ▶ Play
            </button>
            <button className="btn-info" onClick={() => openModal(featured)}>
              ⓘ More Info
            </button>
          </div>
        </div>
      </section>

      {/* ── Browse grid ── */}
      <section className="browse">
        <h2 className="browse__heading">Popular Movies</h2>
        <Row xs={2} sm={3} md={4} lg={5} className="g-3">
          <List movies={movies} />
        </Row>
      </section>
    </>
  );
}
