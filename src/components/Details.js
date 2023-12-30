import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import playImg from "../play.svg";
import infoImg from "../info.svg";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import { getYear } from "../utils";

export default function Details(props) {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(false);

  function handleHide() {
    navigate(-1);
  }

  function handlePlay() {
    navigate(`/watch/${props.movie.id}`);
  }

  const { title, poster_path, release_date, overview } = props.movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : null;

  return (
    <Modal
      show={true}
      onHide={handleHide}
      size="sm"
      dialogClassName="movie-preview"
    >
      <Modal.Body>
        <Row>
          <Col>
            {posterUrl && (
              <img
                src={posterUrl}
                alt={title}
                width="150px"
                className="text-center"
              />
            )}
            <p>
              <strong>{title}</strong>
            </p>
            <p>{release_date ? getYear(release_date) : null}</p>
            <Button variant="light" onClick={handlePlay}>
              <img src={playImg} alt="" />
              Play
            </Button>
            {showOverview ? (
              <p className="movie-overview">{overview}</p>
            ) : (
              <Button
                onClick={() => setShowOverview(true)}
                variant="secondary"
              >
                <img src={infoImg} alt="" />
                Overview
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
