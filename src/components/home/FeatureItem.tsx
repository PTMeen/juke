import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import { Box, Typography, Paper } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface IProps {
  title: string;
  content: string;
  icon: any;
}

function FeatureItem({ title, content, icon }: IProps) {
  return (
    <Paper
      sx={{
        p: 5,
        borderRadius: 5,
        "&:hover": {
          transform: "scale(1.05) translateY(-10px)",
          borderColor: "primary.main",
        },
        transition: "all 0.2s",
      }}
      variant="outlined"
    >
      <Box
        bgcolor="primary.main"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={2}
        sx={{ width: "50px", height: "50px" }}
        color="white"
      >
        {icon}
      </Box>
      <Box mt={2}>
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
        <Typography>{content}</Typography>
      </Box>
    </Paper>
  );
}
export default FeatureItem;
