import React, { useState, useEffect } from "react";
import FilterMoviesCard from "../components/filterMoviesCard";
import MovieList from "../components/movieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [genres, setGenres] = useState([]);

  const handleUserInput = (type, value) => {
    if (type === "name") setNameFilter(value);
    if (type === "genre") setGenreFilter(value);
  };

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch {
        setMovies([]);
      }
    };
    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/genres");
        const data = await res.json();
        setGenres(Array.isArray(data) ? data : []);
      } catch {
        setGenres([]);
      }
    };
    fetchMovies();
    fetchGenres();
  }, []);

  const displayedMovies = movies.filter((m) => {
    const matchesName =
      m.title && m.title.toLowerCase().includes(nameFilter.toLowerCase());
    if (genreFilter === "0") return matchesName;
    const gid = Number(genreFilter);
    const ids = Array.isArray(m.genre_ids) ? m.genre_ids : [];
    return matchesName && ids.includes(gid);
  });

  return (
    <div className="page">
      <h1>Movies</h1>
      <FilterMoviesCard
        titleFilter={nameFilter}
        genreFilter={genreFilter}
        genres={genres}
        onUserInput={handleUserInput}
        numResults={displayedMovies.length}
      />
      <MovieList movies={displayedMovies} selectFavorite={addToFavorites} />
    </div>
  );
};

export default HomePage;
