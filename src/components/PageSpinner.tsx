import { Box, CircularProgress } from "@mui/material";

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
