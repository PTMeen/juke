import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box/Box";

function DefaultLayout() {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Box mt={10}>
        <Outlet />
      </Box>
    </Container>
  );
}
export default DefaultLayout;
