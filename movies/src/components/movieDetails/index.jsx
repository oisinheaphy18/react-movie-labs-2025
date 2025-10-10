import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews";

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {movie.overview}
            </Typography>
            <Typography variant="body2">Release: {movie.release_date}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Rating: {movie.vote_average}
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Chip label="Production Countries" color="primary" sx={{ mr: 1, mb: 1 }} />
              {(movie.production_countries || []).map((c) => (
                <Chip key={c.iso_3166_1 + c.name} label={c.name} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "fixed", bottom: "1em", right: "1em" }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
