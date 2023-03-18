import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

function DefaultLayout() {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Outlet />
    </Container>
  );
}
export default DefaultLayout;
