import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { getYear } from "../utils";
import "./Details.css";

export default function Details({ movie }) {
  const navigate = useNavigate();

  function handleHide() {
    navigate(-1);
  }

  function handlePlay() {
    navigate(`/watch/${movie.id}`);
  }

  const { title, poster_path, backdrop_path, release_date, overview, vote_average } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342/${poster_path}`
    : null;
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w780/${backdrop_path}`
    : null;

  return (
    <Modal
      show={true}
      onHide={handleHide}
      size="lg"
      centered
      dialogClassName="movie-modal"
    >
      <Modal.Body className="p-0">
        {/* ── Backdrop image at top ── */}
        {backdropUrl ? (
          <div
            className="movie-modal__hero"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="movie-modal__hero-fade" />
            <button
              className="movie-modal__close"
              onClick={handleHide}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="movie-modal__hero movie-modal__hero--empty">
            <button
              className="movie-modal__close"
              onClick={handleHide}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Content row ── */}
        <div className="movie-modal__content">
          {posterUrl && (
            <img
              src={posterUrl}
              alt={title}
              className="movie-modal__poster"
            />
          )}
          <div className="movie-modal__info">
            <h2 className="movie-modal__title">{title}</h2>
            <div className="movie-modal__meta">
              {release_date && <span>{getYear(release_date)}</span>}
              {vote_average > 0 && (
                <span className="movie-modal__rating">
                  ★ {vote_average.toFixed(1)}
                </span>
              )}
            </div>
            {overview && (
              <p className="movie-modal__overview">{overview}</p>
            )}
            <button className="btn-play movie-modal__play" onClick={handlePlay}>
              ▶ Play
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
