import { useMediaQuery, useTheme } from "@mui/material";

export const useIsBigScreen = (): boolean => {
  const theme = useTheme();
  const isOnBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return isOnBigScreen;
};
