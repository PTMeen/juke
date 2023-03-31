import { Box, Typography } from "@mui/material";
import MySongs from "../components/manage/MySongs";
import SongUploader from "../components/manage/SongUploader";
import PageSpinner from "../components/PageSpinner";
import { useAppSelector } from "../store/store";

function ManagePage() {
  const { mySongs, isLoading, errorMessage } = useAppSelector(
    (state) => state.mySongs
  );

  if (isLoading) {
    return <PageSpinner />;
  }

  if (errorMessage) {
    return (
      <Box>
        <Typography fontWeight="bold" variant="h2" color="error">
          {errorMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box pb={4}>
      <Box component="section" mb={4}>
        <SongUploader />
      </Box>
      <Box>
        {mySongs.length ? (
          <MySongs mySongs={mySongs} />
        ) : (
          <Box py={5}>
            <Typography variant="h3" textAlign="center">
              You haven't upload any songs yet
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default ManagePage;
