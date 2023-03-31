import { Box, Stack, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";

function CommentItem() {
  return (
    <Box py={2} display="flex">
      <UserAvatar src={null} username="Meen" />
      <Box ml={2}>
        <Typography variant="body2" gutterBottom>
          Meen
        </Typography>
        <Typography variant="body1">I love this song</Typography>
      </Box>
    </Box>
  );
}
export default CommentItem;
