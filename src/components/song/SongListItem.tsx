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
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import { Song } from "../../types/song";
import SongAvatar from "./SongAvatar";

function SongListItem({ title, url, artist, cover, genres, uploadedBy }: Song) {
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
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">{title}</Typography>
            {genres?.length && (
              <Chip label={genres[0]} size="small" variant="outlined" />
            )}
          </Stack>
          <Typography
            sx={(theme) => ({ color: theme.palette.text.secondary })}
            fontWeight="bold"
            variant="subtitle2"
          >
            {artist}
          </Typography>
          <Typography
            variant="caption"
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            uploaded by {uploadedBy}
          </Typography>
          <Box my={2}></Box>
        </Box>
      </Stack>

      {/* big screen buttons */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box>
          <IconButton size="large">
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </Box>
        <Box>
          <Tooltip title={`Play ${title}`} arrow>
            <IconButton size="large" color="primary">
              <PlayCircleOutlineRoundedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
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
