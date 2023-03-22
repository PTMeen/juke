import { Alert, AlertColor } from "@mui/material";
import { AuthFormStatus } from "../../types/auth";

interface IProps {
  status: AuthFormStatus;
  successMessage: string;
  pendingMessage: string;
  errorMessage: string;
}

function AuthFormAlert({
  status,
  successMessage,
  pendingMessage,
  errorMessage,
}: IProps) {
  let msg = pendingMessage;
  let severity: AlertColor = "info";

  if (status === "success") {
    msg = successMessage;
    severity = "success";
  }

  if (status === "error") {
    msg = errorMessage;
    severity = "error";
  }

  return <Alert severity={severity}>{msg}</Alert>;
}
export default AuthFormAlert;
