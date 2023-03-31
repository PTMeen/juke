import { Box, Chip, Stack, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import { formatTimeDistance } from "../../utils/time";

interface Props {
  title: string;
  artist: string;
  genre: string;
  uploadedAt: string;
  uploadedBy: string;
}

function SongDetails({ artist, title, uploadedAt, uploadedBy, genre }: Props) {
  const uploadDateText = formatTimeDistance(uploadedAt);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        <Typography
          sx={(theme) => ({ color: theme.palette.text.secondary })}
          fontWeight="bold"
          variant="subtitle2"
        >
          {artist}
        </Typography>
        {genre && <Chip label={genre} size="small" variant="outlined" />}
      </Stack>
      <Typography
        variant="caption"
        sx={(theme) => ({ color: theme.palette.text.secondary })}
      >
        uploaded by {uploadedBy} - {uploadDateText}
      </Typography>
      <Box my={2}></Box>
    </Box>
  );
}

export default SongDetails;
