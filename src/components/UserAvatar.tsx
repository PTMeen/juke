import { Avatar } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

interface Props {
  src: string | null;
  height?: number;
  width?: number;
  username?: string;
}

function UserAvatar({ src, width = 50, height = 50, username }: Props) {
  if (src) {
    return (
      <Avatar
        variant="circular"
        src={src}
        alt={username}
        sx={{ width, height }}
      />
    );
  }

  return (
    <Avatar
      variant="circular"
      alt={username}
      sx={(theme) => ({ width, height, bgcolor: theme.palette.primary.main })}
    >
      <PersonRoundedIcon />
    </Avatar>
  );
}
export default UserAvatar;
