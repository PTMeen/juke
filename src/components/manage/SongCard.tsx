import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Song } from "../../types/song";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

import defaultCover from "../../assets/images/default-music-card.jpg";

function SongCard({ song }: { song: Song }) {
  const presentDay = new Date();
  const uploadedDate = new Date(song.uploadedAt);

  return (
    <Card>
      <CardMedia
        sx={{ minHeight: 150 }}
        image={song?.cover || defaultCover}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1">
          {song.title}
        </Typography>
        <Typography sx={{ opacity: 0.75 }}>{`${formatDistance(
          presentDay,
          uploadedDate
        )} ago`}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button size="small" component={Link} to={`/songs/${song.id}`}>
          comments
        </Button>
        <Button size="small">edit</Button>
        <Button size="small">delete</Button>
      </CardActions>
    </Card>
  );
}
export default SongCard;
