import React, { useState } from "react";
import { options } from "../api.js";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import "./Watch.css";
import caretLeft from "../caret-left.svg";

export default function Details() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [key, setKey] = useState("");

  fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      setKey(response.results[0].key);
    })
    .catch((err) => console.error(err));

  return (
    <div className="video-container">
      {key && (
        <Spinner animation="border" role="status" className="spinner"></Spinner>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${key}?&autoplay=1&mute=1&playsinline=1"`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        className="backButton"
      >
        <img src={caretLeft} alt="go back" className="back-arrow" />
      </button>
    </div>
  );
}
