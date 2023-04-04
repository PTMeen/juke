import {
  Typography,
  Box,
  Stack,
  IconButton,
  Paper,
  Slider,
  Fade,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { usePlayerContext } from "../context/PlayerContext";

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    seek,
    duration,
    pauseSong,
    resumeSong,
    onChangeSeek,
    restartSong,
  } = usePlayerContext();

  if (!currentSong) return null;

  const handleClick = () => {
    if (Math.floor(seek) === Math.floor(duration)) {
      return restartSong();
    }

    if (isPlaying) {
      return pauseSong();
    }
    resumeSong();
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    const padTo2DigitsMinutes = minutes.toString().padStart(2, "0");
    const padTo2DigitsSeconds = seconds.toString().padStart(2, "0");

    return `${padTo2DigitsMinutes}:${padTo2DigitsSeconds}`;
  };

  const handleChange = (e: any) => {
    pauseSong();
    onChangeSeek(e?.target?.value);
  };

  let Icon = isPlaying ? PauseRoundedIcon : PlayArrowRoundedIcon;
  if (Math.floor(seek) === Math.floor(duration)) {
    Icon = RestartAltRoundedIcon;
  }

  return (
    <Fade in={!!currentSong}>
      <Paper
        sx={{
          mb: 4,
          p: 2,
          borderRadius: 3,
        }}
      >
        <Typography textAlign="center">-- {currentSong.title} --</Typography>
        <Stack direction="row" gap={3} sx={{ mt: 3 }} alignItems="center">
          <IconButton onClick={handleClick} size="large">
            <Icon />
          </IconButton>
          <Stack direction="row" alignItems="center" flexGrow={1} gap={2}>
            <Typography>{formatTime(seek)}</Typography>
            <Box flexGrow={1} display="flex" alignItems="center">
              <Slider
                value={seek}
                max={duration}
                onChange={handleChange}
                onChangeCommitted={resumeSong}
              />
            </Box>
            <Typography>{formatTime(duration)}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Fade>
  );
}
export default MusicPlayer;
