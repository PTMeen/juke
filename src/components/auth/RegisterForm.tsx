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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { Link as RLink } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthFormStatus, RegisterFormData } from "../../types/auth";
import { registerSchema } from "../../utils/formValidation";
import AuthFormAlert from "./AuthFormAlert";

import GoogleSigninButton from "./GoogleSigninButton";
import PasswordInput from "./PasswordInput";

function RegisterForm() {
  const [registerStatus, setRegisterStatus] = useState<AuthFormStatus>("idle");
  const [registerError, setRegisterError] = useState("");

  const handleSubmit = async (values: RegisterFormData) => {
    const { email, password, name } = values;

    setRegisterError("");
    setRegisterStatus("pending");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      setRegisterStatus("success");
    } catch (error) {
      setRegisterError("Something went wrong");
      setRegisterStatus("error");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  const showFormAlert: boolean =
    registerStatus !== "idle" || Boolean(registerError);

  return (
    <Paper sx={{ px: 3, py: 5, maxWidth: "500px", mx: "auto" }} elevation={3}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        component="h3"
        gutterBottom
      >
        Register
      </Typography>
      {showFormAlert && (
        <Fade in={showFormAlert}>
          <Box my={3}>
            <AuthFormAlert
              status={registerStatus}
              pendingMessage="Creating your account..."
              successMessage="Register success"
              errorMessage={registerError}
            />
          </Box>
        </Fade>
      )}
      <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            variant="filled"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Stack>
        <Stack direction="row" mt={4} spacing={1}>
          <Button type="submit" variant="contained" fullWidth size="large">
            submit
          </Button>
          <GoogleSigninButton />
        </Stack>
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          Already a member?{" "}
        </Typography>
        <Link
          component={RLink}
          to="/auth/login"
          underline="none"
          color="primary.light"
        >
          Login
        </Link>
      </Box>
    </Paper>
  );
}
export default RegisterForm;
