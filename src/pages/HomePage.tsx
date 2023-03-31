import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Features from "../components/home/Features";
import HomeHero from "../components/home/HomeHero";
import { useAuthContext } from "../context/AuthContext";
import PageSpinner from "../components/PageSpinner";

function HomePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/manage");
    }
  }, [user]);

  if (user === undefined) {
    return <PageSpinner />;
  }

  return (
    <Stack gap={20} py={5}>
      <Box>
        <HomeHero />
      </Box>
      <Box>
        <Features />
      </Box>
    </Stack>
  );
}
export default HomePage;
