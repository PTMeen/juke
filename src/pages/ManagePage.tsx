import { Box } from "@mui/material";
import SongUploader from "../components/manage/SongUploader";
import SongsList from "../components/song/SongsList";
import { dummySongs } from "../constants/dummyData";

function ManagePage() {
  return (
    <Box>
      <Box component="section">
        <SongUploader />
      </Box>
      <Box component="section">
        <SongsList songs={dummySongs} />
      </Box>
    </Box>
  );
}
export default ManagePage;
