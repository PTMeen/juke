import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuthContext } from "../context/AuthContext";

function RegisterPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/manage");
    }
  }, [user]);

  return (
    <Box py={5}>
      <RegisterForm />
    </Box>
  );
}
export default RegisterPage;
