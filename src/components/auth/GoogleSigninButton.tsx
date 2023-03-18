import { Button, IconButton, Tooltip } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function GoogleSigninButton() {
  return (
    <Tooltip title="Sign in with Google" arrow placement="top">
      <IconButton
        color="primary"
        sx={(theme) => ({
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: "4px",
        })}
      >
        <GoogleIcon />
      </IconButton>
    </Tooltip>
  );
}
export default GoogleSigninButton;
