import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { Comment } from "../../types/comment";
import CommentItem from "./CommentItem";

interface Props {
  isLoading: boolean;
  comments: Comment[];
  error: string;
}

function CommentList({ isLoading, comments, error }: Props) {
  if (isLoading) {
    return (
      <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }} variant="outlined">
      {comments.length > 0 ? (
        <Box>
          {comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />;
          })}
        </Box>
      ) : (
        <Box>
          <Typography sx={{ opacity: 0.75 }} textAlign="center">
            This song doesn't have any comment
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
export default CommentList;
