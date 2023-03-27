import { Grid } from "@mui/material";
import { Song } from "../../types/song";
import SongCard from "./SongCard";

interface IProps {
  mySongs: Song[];
}

function MySongs({ mySongs }: IProps) {
  return (
    <Grid container spacing={3}>
      {mySongs.map((mySong) => {
        return (
          <Grid item key={mySong.id} xs={12} sm={6} md={4} lg={3}>
            <SongCard song={mySong} />
          </Grid>
        );
      })}
    </Grid>
  );
}
export default MySongs;
