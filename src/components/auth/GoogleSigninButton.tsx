import { IconButton, Tooltip } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuthContext } from "../../context/AuthContext";

function GoogleSigninButton() {
  const { googleSignin } = useAuthContext();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tooltip title="Sign in with Google" arrow placement="top">
      <IconButton
        type="button"
        color="primary"
        sx={(theme) => ({
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: "4px",
        })}
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon />
      </IconButton>
    </Tooltip>
  );
}
export default GoogleSigninButton;
