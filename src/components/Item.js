import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Item(props) {
  let timeout = null;

  const navigate = useNavigate();
  const location = useLocation();

  function onHover() {
    timeout = setTimeout(() => {
      navigate("/modal", {
        state: { previousLocation: location, movie: props.movie },
      });
    }, 500);
  }
  function resetTimer() {
    window.clearTimeout(timeout);
  }

  function getYear(data) {
    return new Date(data).getFullYear();
  }

  let { title, poster_path, release_date } = props.movie;

  const full_poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  return (
    <>
      <Col xs={12} md={3} className="user">
        <Card onMouseOver={() => onHover()} onMouseOut={resetTimer}>
          <Card.Img
            variant="top"
            src={full_poster_path}
            role="presentation"
            alt={title}
          ></Card.Img>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle></Card.Subtitle>
            <Card.Text>{getYear(release_date)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
