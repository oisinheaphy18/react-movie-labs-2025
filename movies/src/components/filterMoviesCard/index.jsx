import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getGenres } from "../../api/tmdb-api";

const FilterMoviesCard = ({
  onUserInput,
  titleFilter = "",
  genreFilter = "0",
}) => {
  const [genres, setGenres] = useState([{ id: "0", name: "All" }]);

  useEffect(() => {
    getGenres().then((allGenres) => {
      setGenres([genres[0], ...allGenres]);
    });
  }, []);

  const handleTextChange = (e) => {
    onUserInput("name", e.target.value);
  };

  const handleGenreChange = (e) => {
    onUserInput("genre", e.target.value);
  };

  return (
    <Card>
      <CardHeader title="Filter" />
      <CardContent>
        <TextField
          label="Title"
          variant="outlined"
          value={titleFilter}
          onChange={handleTextChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            label="Genre"
            value={genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((g) => (
              <MenuItem key={g.id} value={String(g.id)}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;
