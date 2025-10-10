import React from "react";
import Movie from "../movieCard/";

const MovieList = (props) => {
  const movies = props.movies || [];
  return (
    <div className="grid">
      {movies.map((m) => (
        <Movie key={m.id} movie={m} selectFavorite={props.selectFavorite} />
      ))}
    </div>
  );
};

export default MovieList;
