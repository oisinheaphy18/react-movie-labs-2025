// src/pages/topRatedMoviesPage.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
// Part 1: Extend the App - we fetch top rated movies here
import { getTopRatedMovies } from "../api/tmdb-api";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const TopRatedMoviesPage = () => {
  // Part 1: Extend the App - useQuery calls our new API function
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["toprated"],
    queryFn: getTopRatedMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // TMDB returns { results: [...] }
  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      // we can reuse PlaylistAdd icon if you want to add to watchlist/mustWatch
      action={(movie) => <PlaylistAdd movie={movie} />}
    />
  );
};

export default TopRatedMoviesPage;
