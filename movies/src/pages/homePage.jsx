import React, { useState, useEffect } from "react";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Header from "../components/headerMovieList";
import FilterCard from "../components/filterMoviesCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const genreId = Number(genreFilter);
  const displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => json.results)
      .then((ms) => setMovies(ms));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header title="Home Page" />
      </Grid>
      <Grid item xs={12} md={4} lg={3} xl={2}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={9} xl={10}>
        <MovieList movies={displayedMovies} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
