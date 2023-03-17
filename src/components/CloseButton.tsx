import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface IProps {
  onClick: () => void;
}

function CloseButton({ onClick }: IProps) {
  return (
    <IconButton onClick={onClick}>
      <CloseRoundedIcon />
    </IconButton>
  );
}
export default CloseButton;
