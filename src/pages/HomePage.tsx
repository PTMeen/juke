import { Box, Stack } from "@mui/material";
import Features from "../components/home/Features";
import HomeHero from "../components/home/HomeHero";
import { useColorModeContext } from "../theme";

function HomePage() {
  return (
    <Stack gap={15}>
      <Box>
        <HomeHero />
      </Box>
      <Box my={15}>
        <Features />
      </Box>
    </Stack>
  );
}
export default HomePage;
