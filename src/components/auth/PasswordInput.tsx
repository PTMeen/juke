import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

interface IProps {
  value: string;
  label: string;
  onChange: () => void;
}
function PasswordInput({ onChange, value, label }: IProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      label={label}
      variant="filled"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleVisibility}>
              {showPassword ? (
                <VisibilityRoundedIcon />
              ) : (
                <VisibilityOffRoundedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
export default PasswordInput;
