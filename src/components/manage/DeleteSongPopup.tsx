import { IconButton } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { Song } from "../../types/song";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteSong } from "../../store/features/mySongsSlice";

interface Props {
  song: Song;
}

function DeleteSongPopup({ song }: Props) {
  const dispatch = useAppDispatch();
  const { isDeleting } = useAppSelector((state) => state.mySongs);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = () => {
    dispatch(deleteSong(song));
    setOpen(false);
  };

  return (
    <>
      <IconButton disabled={isDeleting} onClick={handleOpen}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <ConfirmationModal
        title="Delete Song?"
        handleClose={handleClose}
        open={open}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpen(false)}
      >
        This action can not be revert. Are you sure to delete this song?
      </ConfirmationModal>
    </>
  );
}

export default DeleteSongPopup;
