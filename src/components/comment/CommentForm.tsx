import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { ChangeEvent } from "react";

// interface Props {
//   value: string;
//   onChange: (e:ChangeEvent<HTMLInputElement>) => void
//   onSubmit: () => void
// }

function CommentForm() {
  return (
    <Box component="form" autoComplete="off">
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Leave a comment..."
        />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendRoundedIcon />}
          >
            Comment
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <IconButton type="submit" color="primary">
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}

export default CommentForm;
