import React from "react";
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
import { FilterOptions } from "../../types/song";

interface IProps {
  filterOptions: FilterOptions;
  onFilterOptionChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => void;
  onClearFilterOptions: () => void;
}

function SearchAndFilter({
  filterOptions,
  onClearFilterOptions,
  onFilterOptionChange,
}: IProps) {
  const theme = useTheme();
  const isOnBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Paper sx={{ p: 4, borderRadius: 5 }} elevation={4}>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Sort & Filter
        </Typography>
      </Box>
      <Box
        component="form"
        autoComplete="off"
        mt={3}
        onSubmit={(e) => e.preventDefault()}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              size="small"
              placeholder="Purple Haze"
              variant="filled"
              fullWidth
              name="title"
              value={filterOptions.title}
              onChange={onFilterOptionChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Artist"
              size="small"
              variant="filled"
              fullWidth
              name="artist"
              value={filterOptions.artist}
              onChange={onFilterOptionChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Genre</InputLabel>
              <Select
                label="Genre"
                name="genre"
                defaultValue={filterOptions.genre}
                onChange={onFilterOptionChange}
                value={filterOptions.genre}
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
                defaultValue={filterOptions.sort}
                value={filterOptions.sort}
                onChange={onFilterOptionChange}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="uploadedDate">Uploaded Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={4} sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Button
            type="button"
            size={isOnBigScreen ? "medium" : "small"}
            onClick={onClearFilterOptions}
            sx={{ width: { xs: "50%", md: "fit-content" } }}
          >
            Clear Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
export default SearchAndFilter;
