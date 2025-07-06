import React from "react";
import { Modal, Box, Typography, Button, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function ModalComponent({ open, onClose, onSubmit, title, children }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {children}
        <Box mt={3} display="flex" justifyContent="center">
          {/* <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button> */}
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalComponent;
