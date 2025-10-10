import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, selectFavorite }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const displayedMovies = (movies || [])
    .filter((m) => m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          item
          key="find"
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList selectFavorite={selectFavorite} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
