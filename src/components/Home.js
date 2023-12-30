import React, { useState, useEffect } from "react";
import List from "./List";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { options } from "../api.js";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies.");
        return response.json();
      })
      .then((data) => setMovies(data.results || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Popular Movies</h2>
          {loading && (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading movies...</span>
              </Spinner>
            </div>
          )}
          {error && !loading && (
            <div className="py-5 text-center">
              <p className="text-danger">{error}</p>
            </div>
          )}
          {!loading && !error && movies.length === 0 && (
            <div className="py-5 text-center">
              <p>No movies found.</p>
            </div>
          )}
          {!loading && !error && movies.length > 0 && (
            <Row>
              <List movies={movies} />
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}
