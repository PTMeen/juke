import * as yup from "yup";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(30, "Name cannot be longer than 30 letters"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirmation password required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const addSongSchema = yup.object({
  title: yup.string().required("Title required"),
  artist: yup.string().required("Artist name required"),
});

export { registerSchema, loginSchema, addSongSchema };
