import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Song } from "../../types/song";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import defaultCover from "../../assets/images/default-music-cover.jpg";
import DeleteSongPopup from "./DeleteSongPopup";
import EditSongPopup from "./EditSongPopup";

function SongCard({ song }: { song: Song }) {
  const presentDay = new Date();
  const uploadedDate = new Date(song.uploadedAt);

  return (
    <Card>
      <CardMedia sx={{ minHeight: 150 }} image={song?.cover || defaultCover} />
      <CardContent>
        <Typography gutterBottom variant="subtitle1">
          {song.title} <Chip size="small" label={song.genre} />
        </Typography>
        <Typography sx={{ opacity: 0.75 }}>{`${formatDistance(
          presentDay,
          uploadedDate
        )} ago`}</Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <IconButton size="small" component={Link} to={`/songs/${song.id}`}>
          <ChatBubbleOutlineRoundedIcon />
        </IconButton>
        <EditSongPopup song={song} />
        <DeleteSongPopup song={song} />
      </CardActions>
    </Card>
  );
}
export default SongCard;
