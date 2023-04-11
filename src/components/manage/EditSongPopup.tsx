import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import { addSongSchema } from "../../utils/formValidation";
import CloseButton from "../CloseButton";
import ThumbnailUploader from "./ThumbnailUploader";
import AudioUpload from "./AudioUpload";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { toast } from "react-hot-toast";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Song } from "../../types/song";
import { uploadAudio, uploadThumbnail } from "../../utils/uplaod";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -30%)",
  width: "90%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

interface Props {
  song: Song;
}

function EditSongPopup({ song }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genre, setGenre] = useState(song?.genre ?? "pop");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    if (isLoading) return;
    setIsModalOpen(false);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    setGenre(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (values: { title: string; artist: string }) => {
    const { title, artist } = values;

    setIsLoading(true);
    try {
      if (file) {
        await uploadAudio(song.id, file);
      }
      if (image) {
        await uploadThumbnail(song.id, image);
      }
      const songRef = doc(db, "songs", song.id);
      await updateDoc(songRef, { title, artist, genre });

      setIsLoading(false);
      setIsModalOpen(false);
      resetForm(null);

      if (file || image) {
        return location.reload();
      }

      toast.success("Song updated");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: song.title ?? "",
      artist: song.artist ?? "",
    },
    onSubmit: handleSubmit,
    validationSchema: addSongSchema,
  });

  const resetForm = (e: any) => {
    formik.handleReset(e);
    setIsLoading(false);
    setFile(null);
    setGenre("pop");
    setImage(null);
  };

  return (
    <>
      <IconButton onClick={openModal}>
        <EditRoundedIcon />
      </IconButton>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="add song modal"
        aria-describedby="modal for adding an new song"
      >
        <Box sx={style}>
          <Box
            display="flex"
            flexDirection="row-reverse"
            justifyContent="space-between"
            alignItems="center"
          >
            <CloseButton onClick={closeModal} disabled={isLoading} />
            <Typography variant="h3" fontSize="1.25rem" fontWeight="bold">
              Edit Song
            </Typography>
          </Box>
          <Box
            component="form"
            autoComplete="off"
            pt={3}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="filled"
              label="Title"
              fullWidth
              size="small"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              variant="filled"
              label="Artist"
              fullWidth
              size="small"
              name="artist"
              id="artist"
              sx={{ my: 1 }}
              value={formik.values.artist}
              onChange={formik.handleChange}
              error={formik.touched.artist && Boolean(formik.errors.artist)}
              helperText={formik.touched.artist && formik.errors.artist}
            />
            <FormControl variant="filled" fullWidth>
              <InputLabel id="genre">Genre</InputLabel>
              <Select
                labelId="genre"
                label="Genre"
                value={genre}
                onChange={handleGenreChange}
              >
                <MenuItem value="pop">Pop</MenuItem>
                <MenuItem value="rock">Rock</MenuItem>
                <MenuItem value="jazz">Jazz</MenuItem>
              </Select>
            </FormControl>

            <Box mt={2.5}>
              <ThumbnailUploader
                image={image}
                handleImageChange={handleImageChange}
              />
            </Box>

            <Box mt={2.5}>
              <AudioUpload file={file} handleFileChange={handleFileChange} />
            </Box>

            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                endIcon={<ModeEditOutlineRoundedIcon />}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "update song"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default EditSongPopup;
