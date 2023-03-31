import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

function ConfirmationModal({
  open,
  handleClose,
  title,
  children,
  onConfirm,
  onCancel,
  disabled = false,
}: Props) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            disabled={disabled}
            onClick={onConfirm}
          >
            Confirm
          </Button>
          <Button disabled={disabled} onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default ConfirmationModal;
