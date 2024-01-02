import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import playImg from "../images/play.svg";
import Video from "../elements/Video.js";
import infoImg from "../images/info.svg";
import styles from "./Browse.module.css";
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
      return (
        <>
          <p>{props.movie.overview}</p>
        </>
      );
    }
    return (
      <Button
        onClick={() => {
          showOverview(true);
        }}
        variant="secondary"
        className={styles.button}
      >
        <img
          src={infoImg}
          alt="Expand"
          variant="light"
          className={styles.image}
        />
        Expand
      </Button>
    );
  }

  const { title, release_date, id } = props.movie;

  return (
    <Modal show={true} onHide={handleHide}>
      <Modal.Header closeButton closeVariant="white">
        {props.movie.title}
      </Modal.Header>
      <Modal.Body className={styles.background}>
        <Video id={id} />
        <h1 className={styles.title}>{title}</h1>
        <p>{getYear(release_date)}</p>
        <Link
          to={{
            pathname: `/watch/${props.movie.id}`,
            state: { movie: props.movie },
          }}
          className={styles.link}
        >
          <Button variant="light">
            <img src={playImg} alt="play" />
            Play
          </Button>
        </Link>
        <RenderExpand />
      </Modal.Body>
    </Modal>
  );
}
