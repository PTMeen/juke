import { Box, Stack, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";

import { Comment } from "../../types/comment";
import { formatTimeDistance } from "../../utils/time";

interface Props {
  comment: Comment;
}

function CommentItem({ comment }: Props) {
  return (
    <Box py={2} display="flex">
      <UserAvatar
        src={comment.postedBy.photoURL}
        username={comment.postedBy.displayName || "Anonymous"}
      />
      <Box ml={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" gutterBottom>
            {comment.postedBy.displayName}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.75 }}>
            {formatTimeDistance(comment.postedAt)}
          </Typography>
        </Stack>
        <Typography variant="subtitle2">{comment.content}</Typography>
      </Box>
    </Box>
  );
}
export default CommentItem;
