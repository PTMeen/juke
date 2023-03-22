import {
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  Button,
  Link,
  Fade,
} from "@mui/material";
import { Link as RLink } from "react-router-dom";
import { useFormik } from "formik";

import GoogleSigninButton from "./GoogleSigninButton";
import PasswordInput from "./PasswordInput";
import { AuthFormStatus, LoginFormData } from "../../types/auth";
import { loginSchema } from "../../utils/formValidation";
import { useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import AuthFormAlert from "./AuthFormAlert";

function LoginForm() {
  const [loginStatus, setLoginStatus] = useState<AuthFormStatus>("idle");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (values: LoginFormData) => {
    const { email, password } = values;

    setLoginError("");
    setLoginStatus("pending");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginStatus("success");
    } catch (error) {
      setLoginError("Incorrect email or password");
      setLoginStatus("error");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  const showFormAlert: boolean = loginStatus !== "idle" || Boolean(loginError);

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
      {showFormAlert && (
        <Fade in={showFormAlert}>
          <Box my={3}>
            <AuthFormAlert
              status={loginStatus}
              pendingMessage="Logging you in..."
              successMessage="Login success"
              errorMessage={loginError}
            />
          </Box>
        </Fade>
      )}
      <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            variant="filled"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <PasswordInput
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>
        <Stack direction="row" mt={4} spacing={1}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loginStatus === "pending"}
          >
            {loginStatus === "pending" ? "Loading..." : "Submit"}
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
