import { Box, Typography } from "@mui/material";
import { Song } from "../../types/song";
import SongListItem from "./SongListItem";

interface IProps {
  songs: Song[];
}

function SongsList({ songs }: IProps) {
  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h6" component="h2">
          {songs.length} {songs.length === 1 ? "Song" : "Songs"} Found
        </Typography>
      </Box>
      {songs.map((song) => {
        return <SongListItem key={song.id} {...song} />;
      })}
    </Box>
  );
}
export default SongsList;
