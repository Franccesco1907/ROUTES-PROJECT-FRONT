import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={8000} // 8s
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        severity={notify.type} // error, info, success, warning
        onClose={handleClose}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
