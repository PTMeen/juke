import { ChangeEvent } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

interface IProps {
  image: File | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ThumbnailUploader({ image, handleImageChange }: IProps) {
  return (
    <Box>
      <Typography gutterBottom variant="h6">
        Add song thumbnail (optional)
      </Typography>
      <Stack direction="row" gap={2} alignItems="baseline">
        <Button
          size="small"
          variant="outlined"
          component="label"
          sx={{ textTransform: "capitalize", mt: 1 }}
        >
          attach image
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </Button>
        {image && (
          <Typography variant="body2" fontSize="0.5rem">
            {image.name}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
export default ThumbnailUploader;
