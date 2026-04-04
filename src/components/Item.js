import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { getYear } from "../utils";
import "./Item.css";

export default function Item({ movie }) {
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { title, poster_path, release_date } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : null;

  function handleMouseEnter() {
    timerRef.current = setTimeout(() => {
      navigate("/modal", {
        state: { previousLocation: location, movie },
      });
    }, 500);
  }

  function handleMouseLeave() {
    clearTimeout(timerRef.current);
  }

  function handleClick() {
    clearTimeout(timerRef.current);
    navigate("/modal", {
      state: { previousLocation: location, movie },
    });
  }

  return (
    <Col>
      <article
        className="movie-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`${title}${release_date ? `, ${getYear(release_date)}` : ""}`}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="movie-card__poster"
          />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder" />
        )}
        <div className="movie-card__overlay">
          <p className="movie-card__title">{title}</p>
          {release_date && (
            <p className="movie-card__year">{getYear(release_date)}</p>
          )}
        </div>
      </article>
    </Col>
  );
}
