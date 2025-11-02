import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTrendingToday } from "../api/tmdb-api";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const TrendingTodayPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingToday,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Today"
      movies={movies}
      action={(movie) => <PlaylistAdd movie={movie} />}
      badgeText="Trending"
    />
  );
};

export default TrendingTodayPage;
