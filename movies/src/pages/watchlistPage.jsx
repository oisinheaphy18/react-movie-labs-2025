import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovies } from "../api/tmdb-api";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";

const WatchlistPage = () => {
  const { mustWatch } = useContext(MoviesContext);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const allMovies = data.results || [];
  const watchlistMovies = allMovies.filter((m) => mustWatch.includes(m.id));

  return (
    <PageTemplate
      title="My Watchlist"
      movies={watchlistMovies}
      action={(movie) => <RemoveFromFavoritesIcon movie={movie} />}
    />
  );
};

export default WatchlistPage;
