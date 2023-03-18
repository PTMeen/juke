import { Box, Stack } from "@mui/material";
import Features from "../components/home/Features";
import HomeHero from "../components/home/HomeHero";

function HomePage() {
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
