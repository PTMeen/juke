import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";

function DefaultLayout() {
  return (
    <>
      <Container maxWidth="lg">
        <Navbar />
        <Box pt={15}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
export default DefaultLayout;
