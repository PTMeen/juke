import { Box, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Suspense, useCallback, useEffect, useState } from "react";
import MySongs from "../components/manage/MySongs";
import SongCard from "../components/manage/SongCard";
import SongUploader from "../components/manage/SongUploader";
import PageSpinner from "../components/PageSpinner";
import { useAuthContext } from "../context/AuthContext";
import { db, auth } from "../firebase";
import { Song } from "../types/song";

function ManagePage() {
  const [mySongs, setMySongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user = useAuthContext().user!;

  useEffect(() => {
    const fetchMySongs = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const songsCol = collection(db, "songs");
        const q = query(songsCol, where("uid", "==", user?.uid));
        const snapshot = await getDocs(q);
        const songs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Song[];
        setMySongs(songs);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Error fetching your songs, Please try again later.");
        setIsLoading(false);
      }
    };

    if (user) {
      fetchMySongs();
    }
  }, [user]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (errorMessage) {
    return (
      <Box>
        <Typography fontWeight="bold" variant="h2" color="error">
          {errorMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box component="section" mb={4}>
        <SongUploader />
      </Box>
      <Box>
        <MySongs mySongs={mySongs} />
      </Box>
    </Box>
  );
}
export default ManagePage;
