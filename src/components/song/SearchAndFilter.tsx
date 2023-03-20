import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function SearchAndFilter() {
  const theme = useTheme();
  const isOnBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "all",
    sort: "title",
  });

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilter = () => {
    setFormData({
      title: "",
      artist: "",
      genre: "all",
      sort: "title",
    });
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 5 }} elevation={4}>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Sort & Filter
        </Typography>
      </Box>
      <Box component="form" autoComplete="off" mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              size="small"
              placeholder="Purple Haze"
              variant="filled"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Artist"
              size="small"
              variant="filled"
              fullWidth
              name="artist"
              value={formData.artist}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Genre</InputLabel>
              <Select
                label="Genre"
                name="genre"
                defaultValue={formData.genre}
                onChange={handleFormChange}
                value={formData.genre}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pop">Pop</MenuItem>
                <MenuItem value="rock">Rock</MenuItem>
                <MenuItem value="jazz">Jazz</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Sort</InputLabel>
              <Select
                label="Sort"
                name="sort"
                size="small"
                defaultValue={formData.sort}
                value={formData.sort}
                onChange={handleFormChange}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="uploadedDate">Uploaded Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Stack direction="row" mt={4} spacing={2}>
          <Button
            variant="contained"
            size={isOnBigScreen ? "medium" : "small"}
            endIcon={<FilterListRoundedIcon />}
            sx={{ width: { xs: "50%", md: "fit-content" } }}
          >
            Filter
          </Button>
          <Button
            size={isOnBigScreen ? "medium" : "small"}
            onClick={handleClearFilter}
            sx={{ width: { xs: "50%", md: "fit-content" } }}
          >
            Clear Filters
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
export default SearchAndFilter;
