import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuthContext } from "../context/AuthContext";

function LoginPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/manage");
    }
  }, [user]);

  return (
    <Box py={5}>
      <LoginForm />
    </Box>
  );
}
export default LoginPage;
