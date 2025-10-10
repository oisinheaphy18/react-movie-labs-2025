import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  return (
    <Grid container spacing={2}>
      {props.movies.map((m) => (
        <Grid item key={m.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Movie movie={m} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
