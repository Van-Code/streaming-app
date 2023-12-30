import React from "react";
import Item from "./Item";

export default function List(props) {
  return props.movies.map((movie) => {
    return <Item movie={movie} key={movie.id} />;
  });
}
