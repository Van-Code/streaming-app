import React from "react";
import Video from "../elements/Video.js";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import styles from "./Watch.module.css";
import caretLeft from "../images/caret-left.svg";

export default function Watch(props) {
  let navigate = useNavigate();

  return (
    <div className={styles.videoContainer}>
      {!props.key && (
        <Spinner
          animation="border"
          role="status"
          className={styles.spinner}
        ></Spinner>
      )}
      {props.key && <Video key={props.key} allowFullScreen={true} />}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        className={styles.backButton}
      >
        <img src={caretLeft} alt="go back" className={styles.backArrow} />
      </button>
    </div>
  );
}
