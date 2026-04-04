import React, { useState, useEffect } from "react";
import { options } from "../api.js";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import "./Watch.css";
import caretLeft from "../caret-left.svg";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const first = response.results?.find((v) => v.type === "Trailer") ?? response.results?.[0];
        if (first?.key) {
          setVideoKey(first.key);
        } else {
          setError("No trailer available for this title.");
        }
      })
      .catch(() => setError("Failed to load video. Please try again."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="video-container">
      <button
        className="back-btn"
        onClick={() => navigate("/")}
        aria-label="Go back"
      >
        <img src={caretLeft} alt="" />
      </button>

      {loading && (
        <div className="video-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading trailer…</span>
          </Spinner>
        </div>
      )}

      {error && !loading && (
        <div className="video-error">
          <p>{error}</p>
          <button className="btn-info" onClick={() => navigate("/")}>
            ← Go back
          </button>
        </div>
      )}

      {videoKey && !loading && (
        <iframe
          className="video-iframe"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&playsinline=1`}
          title="Movie trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
