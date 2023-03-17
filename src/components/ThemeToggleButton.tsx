import { Box, IconButton, ButtonGroup, Button } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useColorModeContext } from "../theme";

function ThemeToggleButton({ isSingle }: { isSingle: boolean }) {
  const { colorMode, toggleColorMode, setColorMode } = useColorModeContext();

  if (!isSingle) {
    return (
      <ButtonGroup variant="outlined" fullWidth>
        <Button onClick={() => setColorMode("light")}>Light</Button>
        <Button onClick={() => setColorMode("dark")}>Dark</Button>
      </ButtonGroup>
    );
  }

  return (
    <IconButton
      onClick={toggleColorMode}
      size="small"
      color="primary"
      sx={(theme) => ({
        borderRadius: 1,
        border: `1px solid ${theme.palette.primary.light}`,
      })}
    >
      {colorMode === "light" ? (
        <DarkModeOutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
  );
}
export default ThemeToggleButton;
