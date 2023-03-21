import {
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import { Link as RLink } from "react-router-dom";
import { RegisterFormData } from "../../types/auth";
import { registerSchema } from "../../utils/formValidation";

import GoogleSigninButton from "./GoogleSigninButton";
import PasswordInput from "./PasswordInput";

function RegisterForm() {
  const handleSubmit = (values: RegisterFormData) => {};

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
            Submit
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
