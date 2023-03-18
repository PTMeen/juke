import { Box, Typography, Paper, Grid, Button, useTheme } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import MusicAnimation from "../../assets/animations/music.json";

function HomeHero() {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        px: { md: 5, xs: 2 },
        py: { xs: 4, md: 8 },
        borderRadius: 5,
        position: "relative",
      }}
      elevation={5}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={900}
              color="primary.main"
              gutterBottom
            >
              The Music Player
              <br />
              <Typography
                variant="inherit"
                component="span"
                color="text.primary"
                fontWeight={700}
              >
                You Always Wanted
              </Typography>
            </Typography>
            <Typography>
              Listen to your favorite music uninterrupted with{" "}
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                Juke Music
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              mt: { xs: 5, md: 10 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/auth/register"
              endIcon={<ArrowForwardIosRoundedIcon />}
              size="large"
              sx={{
                borderRadius: 5,
                textTransform: "capitalize",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Register Now
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: "relative", display: { xs: "none", md: "grid" } }}
        >
          <Box position="absolute">
            <Lottie
              animationData={MusicAnimation}
              style={{
                height: 500,
                width: 500,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default HomeHero;
