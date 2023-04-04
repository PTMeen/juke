import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";
import { usePlayerContext } from "../context/PlayerContext";

function DefaultLayout() {
  const { currentSong } = usePlayerContext();

  return (
    <>
      <Container maxWidth="lg">
        <Navbar />
        <Box pt={15}>
          <MusicPlayer />
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
export default DefaultLayout;
