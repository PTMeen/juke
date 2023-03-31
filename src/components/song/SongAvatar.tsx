import { Avatar } from "@mui/material";
import defaultCoverImg from "../../assets/images/default-music-cover.jpg";

interface Props {
  coverUrl: string | undefined;
  title: string;
  width?: number;
  height?: number;
}

function SongAvatar({ coverUrl, title, width = 100, height = 100 }: Props) {
  return (
    <Avatar
      alt={title}
      src={coverUrl || defaultCoverImg}
      variant="rounded"
      sx={{ width, height }}
    />
  );
}
export default SongAvatar;
