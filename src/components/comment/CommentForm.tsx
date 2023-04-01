import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { FormEvent, useState } from "react";
import { NewComment } from "../../types/comment";
import { useAuthContext } from "../../context/AuthContext";

interface Props {
  onSubmit: (newComment: NewComment) => void;
  songId: string;
}

function CommentForm({ onSubmit, songId }: Props) {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    if (!user) return;

    const newComment: NewComment = {
      postedBy: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      postedAt: new Date().toISOString(),
      content: comment,
      songId,
    };

    onSubmit(newComment);
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendRoundedIcon />}
            disabled={!comment}
          >
            Comment
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <IconButton type="submit" color="primary" disabled={!comment}>
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}

export default CommentForm;
