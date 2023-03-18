import { Box, Grid, Typography } from "@mui/material";
import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import FeatureItem from "./FeatureItem";

function Features() {
  return (
    <Box>
      <Typography
        gutterBottom
        variant="h3"
        component="h2"
        textAlign="center"
        color="primary"
        fontWeight="bold"
      >
        Features
      </Typography>
      <Box mt={10}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <FeatureItem
              title="Completely Free"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
          consectetur."
              icon={<MoneyOffCsredRoundedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureItem
              title="No Ads"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
          consectetur."
              icon={<SentimentVerySatisfiedRoundedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureItem
              title="Share your music"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
          consectetur."
              icon={<MusicNoteRoundedIcon />}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Features;
