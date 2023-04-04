import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RLink } from "react-router-dom";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

import { Song } from "../../types/song";
import SongAvatar from "./SongAvatar";
import SongDetails from "./SongDetails";
import { usePlayerContext } from "../../context/PlayerContext";

interface Props {
  song: Song;
}

function SongListItem({ song }: Props) {
  const { title, url, artist, cover, genre, uploadedBy, uploadedAt, id } = song;

  const { selectSong, currentSong, stopSong } = usePlayerContext();

  return (
    <Paper
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 3,
        display: { xs: "block", md: "flex" },
        justifyContent: "space-between",
      }}
      variant="outlined"
    >
      <Stack direction="row" spacing={2}>
        <SongAvatar title={title} coverUrl={cover} />
        <SongDetails
          title={title}
          artist={artist}
          genre={genre}
          uploadedAt={uploadedAt}
          uploadedBy={uploadedBy}
        />
      </Stack>

      {/* big screen buttons */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box>
          <IconButton size="large" component={RLink} to={`/songs/${id}`}>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </Box>
        <Box>
          {currentSong?.id === id ? (
            <Tooltip title={`Stop playing ${title}`} arrow>
              <IconButton size="large" color="primary" onClick={stopSong}>
                <DoDisturbIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={`Play ${title}`} arrow>
              <IconButton
                size="large"
                color="primary"
                onClick={() => selectSong(song)}
              >
                <PlayCircleOutlineRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Stack>

      {/* small screen buttons */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={1} pt={1}>
          <Button
            variant="outlined"
            sx={{ width: "50%" }}
            endIcon={<PlayCircleOutlineRoundedIcon />}
            onClick={() => selectSong(song)}
          >
            Play
          </Button>
          <Button
            sx={{ width: "50%" }}
            endIcon={<ChatBubbleOutlineRoundedIcon />}
          >
            Comments
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
export default SongListItem;
