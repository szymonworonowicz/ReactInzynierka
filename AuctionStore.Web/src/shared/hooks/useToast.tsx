import React, { useState } from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export type ToastType = "success" | "error";

const snackBarOptions: SnackbarOrigin = {
  horizontal: "center",
  vertical: "top",
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function useToast() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (message: string, type: ToastType) => {
    debugger;
    setOpen(true);
    return (
      <Snackbar
        anchorOrigin={snackBarOptions}
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
}
