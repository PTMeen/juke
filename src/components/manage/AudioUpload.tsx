import { ChangeEvent } from "react";
import { Button, Stack, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface IProps {
  file: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function AudioUpload({ file, handleFileChange }: IProps) {
  return (
    <>
      <Typography variant="h6">Attach audio file</Typography>
      <Typography>we only accept an audio file</Typography>
      <Stack direction="row" gap={2} alignItems="baseline">
        <Button
          variant="outlined"
          component="label"
          endIcon={<AttachFileIcon />}
          size="small"
          sx={{ textTransform: "capitalize", mt: 1 }}
        >
          Attach File
          <input
            hidden
            type="file"
            accept=".mp3,audio/*"
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <Typography variant="body2" fontSize="0.5rem">
            {file.name}
          </Typography>
        )}
      </Stack>
    </>
  );
}
export default AudioUpload;
