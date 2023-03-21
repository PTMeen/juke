import { useState } from "react";
import { Link as RLink } from "react-router-dom";
import {
  Box,
  Link,
  Stack,
  useTheme,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import { authedNavLinks, unAuthNavLinks } from "../constants/navigation";
import MobileSidebar from "./MobileSidebar";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const theme = useTheme();
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  const { user, logout } = useAuthContext();
  const navLinks = user ? authedNavLinks : unAuthNavLinks;

  const toggleMobileNavbar = () => {
    setIsMobileNavbarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const renderedNaLinks = navLinks.map((navLink) => {
    return (
      <Link
        key={navLink.label}
        color={theme.palette.text.primary}
        underline="hover"
        component={RLink}
        to={navLink.to}
        sx={{
          "&:hover": {
            color: theme.palette.primary.main,
            transition: "linear all 0.2s",
          },
        }}
      >
        {navLink.label}
      </Link>
    );
  });

  return (
    <Container
      sx={{
        position: "fixed",
        py: 2,
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "background.default",
        zIndex: 10,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link
          underline="none"
          component={RLink}
          to="/"
          sx={(theme) => ({
            fontSize: theme.typography.h4.fontSize,
            fontWeight: "bold",
            fontFamily: "Nunito",
          })}
        >
          JUKE
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          gap={4}
          display={{ xs: "none", sm: "flex" }}
        >
          {renderedNaLinks}
          {user && (
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          )}
          <ThemeToggleButton isSingle />
        </Stack>
        <Box display={{ xs: "block", sm: "none" }}>
          <IconButton onClick={toggleMobileNavbar} size="large">
            <MenuOpenRoundedIcon fontSize="large" />
          </IconButton>
          <MobileSidebar
            isOpen={isMobileNavbarOpen}
            onClose={toggleMobileNavbar}
          />
        </Box>
      </Stack>
    </Container>
  );
}
export default Navbar;
