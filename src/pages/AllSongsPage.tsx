import { Box, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import SearchAndFilter from "../components/song/SearchAndFilter";
import SongsList from "../components/song/SongsList";
import { dummySongs } from "../constants/dummyData";
import { FilterOptions } from "../types/song";
import { sortSongsByTitle, sortSongsByUploadedDate } from "../utils/sort";

function AllSongsPage() {
  const [songs, setSongs] = useState(dummySongs);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    title: "",
    artist: "",
    genre: "all",
    sort: "title",
  });

  const handleFilterOptionChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ): void => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilterOptions = () => {
    setFilterOptions({
      title: "",
      artist: "",
      genre: "all",
      sort: "title",
    });
  };

  function filterSong() {
    const { artist, genre, sort, title } = filterOptions;
    let selectedSongs =
      sort === "title"
        ? sortSongsByTitle(songs)
        : sortSongsByUploadedDate(songs);

    if (genre && genre !== "all") {
      selectedSongs = selectedSongs.filter((song) => {
        return song.genres.includes(genre);
      });
    }

    if (title) {
      selectedSongs = selectedSongs.filter((song) => {
        return song.title.toLowerCase().includes(title.toLowerCase());
      });
    }

    if (artist) {
      selectedSongs = selectedSongs.filter((song) => {
        return song.artist.toLowerCase().includes(artist.toLowerCase());
      });
    }

    return selectedSongs;
  }

  const filteredSongs = filterSong();

  return (
    <Box>
      <Box component="section" mb={10}>
        <SearchAndFilter
          filterOptions={filterOptions}
          onFilterOptionChange={handleFilterOptionChange}
          onClearFilterOptions={handleClearFilterOptions}
        />
      </Box>
      <Box component="section">
        <SongsList songs={filteredSongs} />
      </Box>
    </Box>
  );
}
export default AllSongsPage;
