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

  return (
    <Avatar
      variant="rounded"
      sx={{ width: 100, height: 100, bgcolor: "primary.main", color: "white" }}
    >
      {title[0]}
    </Avatar>
  );
}
export default SongAvatar;
