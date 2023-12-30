import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getYear } from "../utils";

export default function Item({ movie }) {
  let timeout = null;
  const navigate = useNavigate();
  const location = useLocation();

  function onHover() {
    timeout = setTimeout(() => {
      navigate("/modal", {
        state: { previousLocation: location, movie },
      });
    }, 500);
  }

  function resetTimer() {
    window.clearTimeout(timeout);
  }

  const { title, poster_path, release_date } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <Col xs={12} md={3} className="movie-card">
      <Card onMouseOver={onHover} onMouseOut={resetTimer}>
        <Card.Img variant="top" src={posterUrl} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{release_date ? getYear(release_date) : null}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
