import {
  Box,
  Link,
  Stack,
  useTheme,
  Drawer,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link as RLink } from "react-router-dom";
import { unAuthNavLinks, authedNavLinks } from "../constants/navigation";
import { useAuthContext } from "../context/AuthContext";
import { resetMySongs } from "../store/features/mySongs";
import { useAppDispatch } from "../store/store";
import CloseButton from "./CloseButton";
import ThemeToggleButton from "./ThemeToggleButton";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileSidebar({ isOpen, onClose }: IProps) {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  const { user, logout } = useAuthContext();
  const navLinks = user ? authedNavLinks : unAuthNavLinks;

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(resetMySongs());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen && isOnMobile} onClose={onClose}>
      <Box width="250px" p={3} pr={0}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            JUKE
          </Typography>
          <Box>
            <CloseButton onClick={onClose} />
          </Box>
        </Stack>

        <Box pr={3} my={5}>
          <Typography gutterBottom>Select Theme</Typography>
          <ThemeToggleButton isSingle={false} />
        </Box>

        <Box>
          <Stack direction="column" justifyContent="center" gap={3}>
            {navLinks.map((navLink) => {
              return (
                <Link
                  key={navLink.label}
                  component={RLink}
                  to={navLink.to}
                  underline="none"
                  color={theme.palette.text.primary}
                  onClick={onClose}
                  sx={{
                    px: 1,
                    py: 2,
                    borderRadius: 2,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      transition: "linear all 0.2s",
                    },
                  }}
                >
                  {navLink.label}
                </Link>
              );
            })}
          </Stack>
        </Box>

        {user && (
          <Box mt={4} pr={3}>
            <Button variant="contained" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
export default MobileSidebar;
