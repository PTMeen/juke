import { Avatar } from "@mui/material";
import defaultCoverImg from "../../assets/images/default-music-cover.jpg";

function SongAvatar({
  coverUrl,
  title,
}: {
  coverUrl: string | undefined;
  title: string;
}) {
  return (
    <Avatar
      alt={title}
      src={coverUrl || defaultCoverImg}
      variant="rounded"
      sx={{ width: 100, height: 100 }}
    />
  );
}
export default SongAvatar;
