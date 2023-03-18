import {
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { Link as RLink } from "react-router-dom";
import GoogleSigninButton from "./GoogleSigninButton";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  return (
    <Paper sx={{ px: 3, py: 5, maxWidth: "500px", mx: "auto" }} elevation={3}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        component="h3"
        gutterBottom
      >
        Login
      </Typography>
      <Box component="form" autoComplete="off">
        <Stack spacing={2}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            helperText="We will not share your email with anyone"
            variant="filled"
          />
          <PasswordInput label="Password" value="123" onChange={() => {}} />
        </Stack>
        <Stack direction="row" mt={4} spacing={1}>
          <Button variant="contained" fullWidth size="large">
            Submit
          </Button>
          <GoogleSigninButton />
        </Stack>
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          Not a member yet?{" "}
        </Typography>
        <Link
          component={RLink}
          to="/auth/register"
          underline="none"
          color="primary.light"
        >
          Register
        </Link>
      </Box>
    </Paper>
  );
}
export default LoginForm;
