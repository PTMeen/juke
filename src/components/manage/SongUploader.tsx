import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { doc, setDoc } from "firebase/firestore";

import { db, auth } from "../../firebase";
import CloseButton from "../CloseButton";
import { addSongSchema } from "../../utils/formValidation";
import AudioUpload from "./AudioUpload";
import ThumbnailUploader from "./ThumbnailUploader";
import { useAppDispatch } from "../../store/store";
import { addMySong } from "../../store/features/mySongsSlice";
import { addSong } from "../../store/features/songsSlice";
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

function SongUploader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genre, setGenre] = useState("pop");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useAppDispatch();

  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    if (isUploading) return;
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
    if (!file) return;
    if (!auth?.currentUser?.uid || !auth?.currentUser?.displayName) return;

    const { title, artist } = values;
    const songId = uuidv4();

    setIsUploading(true);
    try {
      // upload audio file
      const songUrl = await uploadAudio(songId, file);

      // upload thumbnail image
      let thumbnailUrl;
      if (image) {
        thumbnailUrl = await uploadThumbnail(songId, image);
      }

      const newSong = {
        title,
        artist,
        genre,
        uploadedAt: new Date().toISOString(),
        uid: auth.currentUser.uid,
        uploadedBy: auth.currentUser.displayName,
        url: songUrl,
        cover: thumbnailUrl || "",
      };

      const songRef = doc(db, "songs", songId);
      await setDoc(songRef, newSong);
      dispatch(addMySong({ id: songId, ...newSong }));
      dispatch(addSong({ id: songId, ...newSong }));

      setIsUploading(false);
      setIsModalOpen(false);
      resetForm(null);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      artist: "",
    },
    onSubmit: handleSubmit,
    validationSchema: addSongSchema,
  });

  const resetForm = (e: any) => {
    formik.handleReset(e);
    setIsUploading(false);
    setFile(null);
    setGenre("pop");
    setImage(null);
  };

  return (
    <>
      <Box mb={2}>
        <Button
          variant="contained"
          endIcon={<AddRoundedIcon />}
          onClick={openModal}
        >
          Upload song
        </Button>
      </Box>
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
            <CloseButton onClick={closeModal} disabled={isUploading} />
            <Typography variant="h3" fontSize="1.25rem" fontWeight="bold">
              Upload new song
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
                endIcon={<FileUploadRoundedIcon />}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "upload song"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default SongUploader;
