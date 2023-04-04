import { Box } from "@mui/material";
import { Song } from "../../types/song";
import SongListItem from "./SongListItem";

interface IProps {
  songs: Song[];
  editable?: boolean;
}

function SongsList({ songs }: IProps) {
  return (
    <Box>
      {songs.map((song) => {
        return <SongListItem key={song.id} song={song} />;
      })}
    </Box>
  );
}
export default SongsList;
