import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

function PageSpinner() {
  return (
    <Box
      height="100%"
      position="absolute"
      sx={{ inset: 0 }}
      zIndex={30}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}
export default PageSpinner;
