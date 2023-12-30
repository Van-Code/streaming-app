import React, { useState, useEffect } from "react";
import List from "./List";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { options } from "../api.js";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/authentication", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          fetchData();
        }
      })
      .catch((err) => console.error(err));
  }, []);

  function fetchData() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }

  function renderThumbnails() {
    if (movies) {
      return <List movies={movies} />;
    } else {
      return <Col md={12}>No movies found.</Col>;
    }
  }
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Popular Movies</h2>
          <Row>{renderThumbnails()}</Row>
        </Col>
      </Row>
    </Container>
  );
}
