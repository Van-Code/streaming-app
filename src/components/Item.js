import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Item(props) {
  let timeout = null;

  const navigate = useNavigate();
  const location = useLocation();

  function onHover(id) {
    timeout = setTimeout(() => {
      navigate(`/browse/${id}`, {
        state: { previousLocation: location, movie: props.movie },
      });
    }, 1000);
  }
  function resetTimer() {
    window.clearTimeout(timeout);
  }

  let { id, title, poster_path } = props.movie;

  const full_poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  return (
    <>
      <Col xs={12} md={2} className="user">
        <Card onMouseOver={() => onHover(id)} onMouseOut={resetTimer}>
          <Card.Img
            variant="top"
            src={full_poster_path}
            role="presentation"
            alt={title}
          ></Card.Img>
        </Card>
      </Col>
    </>
  );
}
