import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FC } from "react";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
}

const CloseButton: FC<IProps> = ({ onClick, disabled }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <CloseRoundedIcon />
    </IconButton>
  );
};

CloseButton.defaultProps = {
  disabled: false,
};

export default CloseButton;
