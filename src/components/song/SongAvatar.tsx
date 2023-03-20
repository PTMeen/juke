import { Avatar } from "@mui/material";

function SongAvatar({
  coverUrl,
  title,
}: {
  coverUrl: string | undefined;
  title: string;
}) {
  if (coverUrl) {
    return (
      <Avatar
        alt={title}
        src={coverUrl}
        variant="rounded"
        sx={{ width: 100, height: 100 }}
      />
    );
  }

  return <Avatar sx={{ width: 150, height: 150 }}>{title[0]}</Avatar>;
}
export default SongAvatar;
