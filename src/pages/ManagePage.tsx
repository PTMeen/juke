import { Box, Typography } from "@mui/material";
import SongsList from "../components/song/SongsList";
import { dummySongs } from "../constants/dummyData";

function ManagePage() {
  return (
    <Box>
      <Box component="section">
        <Typography>Upload new Song</Typography>
      </Box>
      <Box component="section">
        <SongsList songs={dummySongs} />
      </Box>
    </Box>
  );
}
export default ManagePage;
