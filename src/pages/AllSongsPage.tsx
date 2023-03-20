import { Box } from "@mui/material";
import SearchAndFilter from "../components/song/SearchAndFilter";
import SongsList from "../components/song/SongsList";
import { dummySongs } from "../constants/dummyData";

function AllSongsPage() {
  return (
    <Box>
      <Box component="section" mb={10}>
        <SearchAndFilter />
      </Box>
      <Box component="section">
        <SongsList songs={dummySongs} />
      </Box>
    </Box>
  );
}
export default AllSongsPage;
