import { Box, Typography, Link } from "@mui/material";
import { Link as RLink } from "react-router-dom";

function ErrorPAge() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box textAlign="center">
        <Typography component="h1" variant="h3" gutterBottom>
          Page not found
        </Typography>
        <Link component={RLink} to="/">
          Go To Home Page
        </Link>
      </Box>
    </Box>
  );
}
export default ErrorPAge;
