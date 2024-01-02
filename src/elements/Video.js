import React, { useState } from "react";
import styles from "../elements/Video.module.css";

import { options } from "../api.js";

export default function Video(props) {
  const [key, setKey] = useState("");

  fetch(
    `https://api.themoviedb.org/3/movie/${props.id}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      setKey(response.results[0].key);
    })
    .catch((err) => console.error(err));
  if (!key) {
    return null;
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${key}?&autoplay=1&mute=1&playsinline=1"`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen={props.allowFullScreen}
      className={props.allowFullScreen ? styles.fullscreen : styles.modalView}
    ></iframe>
  );
}
