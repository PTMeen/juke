import { Box, Typography, Stack } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultCoverImg from "../assets/images/default-music-card.jpg";
import PageSpinner from "../components/PageSpinner";
import { db } from "../firebase";

import { Song } from "../types/song";

function SongPage() {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { songId } = useParams();

  const fetchSongById = useCallback(async (songId: string) => {
    setIsLoading(true);
    try {
      const songsCollection = collection(db, "songs");
      const songRef = doc(songsCollection, songId);
      const snapShot = await getDoc(songRef);

      if (!snapShot.data()) {
        setSong(null);
        setErrorMessage("Song not found");
        setIsLoading(false);

        return;
      }
      const song = { id: snapShot.id, ...snapShot.data() } as Song;
      setSong(song);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Something went wrong");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongById(songId!);
  }, [songId, fetchSongById]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (errorMessage) {
    return (
      <Box py={6}>
        <Typography
          fontWeight="bold"
          variant="h1"
          fontSize="3rem"
          color="primary"
          textAlign="center"
        >
          {errorMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography>{song?.title}</Typography>
    </Box>
  );
}
export default SongPage;
