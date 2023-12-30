import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import playImg from "../play.svg";
import infoImg from "../info.svg";
import "./Details.css";
import { Link, useNavigate } from "react-router-dom";

export default function Details(props) {
  const navigate = useNavigate();
  const [show, showOverview] = useState(false);
  function handleHide() {
    navigate(-1);
  }

  function getYear(data) {
    return new Date(data).getFullYear();
  }
  function RenderExpand() {
    if (show) {
      return <p>{props.movie.overview}</p>;
    }
    return (
      <Button
        onClick={() => {
          showOverview(true);
        }}
        variant="secondary"
      >
        <img src={infoImg} alt="Expand" />
        Overview
      </Button>
    );
  }

  function renderFilm() {
    const { title, poster_path, release_date } = props.movie;
    const full_poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    let image =
        poster_path !== "N/A"
          ? full_poster_path
          : "https://via.placeholder.com/150",
      element = (
        <Col>
          <img
            src={image}
            alt={title}
            width="150px"
            className="text-center"
          ></img>
          <p>
            <strong>{title}</strong>
          </p>
          <p>{getYear(release_date)}</p>
          <Link
            to={{
              pathname: `/watch/${props.movie.id}`,
              state: { movie: props.movie },
            }}
          >
            <Button variant="light">
              <img src={playImg} alt="play" />
              Play
            </Button>
          </Link>
          <RenderExpand />
        </Col>
      );

    return element;
  }

  return (
    <Modal
      show={true}
      onHide={handleHide}
      size="sm"
      dialogClassName="movie-preview"
    >
      <Modal.Body>
        <Row>{renderFilm()}</Row>
      </Modal.Body>
    </Modal>
  );
}
