import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

interface IProps {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent) => void;
  name: string;
  error: boolean | undefined;
  helperText?: string | false | undefined;
}
function PasswordInput({
  onChange,
  value,
  label,
  error,
  name,
  helperText,
}: IProps) {
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
      name={name}
      error={error}
      helperText={helperText}
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
