import { Box, Typography, Stack, Chip, Paper, Divider } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageSpinner from "../components/PageSpinner";
import { db } from "../firebase";
import { Song } from "../types/song";
import SongAvatar from "../components/song/SongAvatar";
import { formatTimeDistance } from "../utils/time";
import CommentForm from "../components/comment/CommentForm";
import { Comment, NewComment } from "../types/comment";
import CommentList from "../components/comment/CommentList";

function SongPage() {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetcingComments, setIsFetcingComments] = useState(false);
  const [commentsError, setCommentsError] = useState("");

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

  const fetchComments = useCallback(async (songId: string) => {
    setIsFetcingComments(true);

    try {
      const q = query(
        collection(db, "comments"),
        where("songId", "==", songId)
      );
      const snapShot = await getDocs(q);
      const comments = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Comment[];
      setComments(comments);
    } catch (error) {
      console.log(error);
      setCommentsError("Error fetching comments");
    }
    setIsFetcingComments(false);
  }, []);

  const postComment = async (newComment: NewComment) => {
    try {
      const commentsCol = collection(db, "comments");
      const snapShot = await addDoc(commentsCol, newComment);
      const comment: Comment = { id: snapShot.id, ...newComment };
      setComments((prev) => [comment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (songId) {
      fetchSongById(songId);
      fetchComments(songId);
    }
  }, [songId, fetchSongById, songId]);

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

  if (!song) {
    return (
      <Box py={6}>
        <Typography
          fontWeight="bold"
          variant="h1"
          fontSize="3rem"
          color="primary"
          textAlign="center"
        >
          Song not found
        </Typography>
      </Box>
    );
  }

  const uploadDateText = formatTimeDistance(song.uploadedAt);

  return (
    <Box>
      <Box component="section">
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" spacing={4}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <SongAvatar
                title={song.title}
                coverUrl={song.cover}
                width={200}
                height={200}
              />
            </Box>
            <Box>
              <Typography
                component="h1"
                variant="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.5rem", sm: "3.5rem" },
                  fontWeight: "bold",
                }}
              >
                {song.title}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="h5" component="p" gutterBottom>
                  {song.artist}{" "}
                </Typography>
                <Chip label={song.genre} size="small" />
              </Stack>
              <Typography>
                Uploaded by {song.uploadedBy} - {uploadDateText}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Box component="section" sx={{ mt: { xs: 4, sm: 8 } }}>
          <Paper sx={{ p: 3 }}>
            <Typography component="h2" variant="h5" gutterBottom>
              Comments
            </Typography>
            <CommentForm onSubmit={postComment} songId={song.id} />
            <Divider sx={{ mt: 5 }} />
            <Box mt={2}>
              <CommentList
                comments={comments}
                isLoading={isFetcingComments}
                error={commentsError}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
export default SongPage;
