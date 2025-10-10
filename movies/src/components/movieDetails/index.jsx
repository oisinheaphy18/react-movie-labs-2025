import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters || [])
      .then((imgs) => setImages(imgs));
  }, [id]);

  if (!movie) return null;

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {movie.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {movie.overview}
      </Typography>

      <ImageList
        sx={{
          height: "100vh",
        }}
        cols={1}
      >
        {images.map((image) => (
          <ImageListItem key={image.file_path} cols={1}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
              alt={image.file_path}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={{ height: 24 }} />
    </Container>
  );
}
