import React from "react";
import { IPopperProps } from "./IPopperProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Popper: React.FC<IPopperProps> = ({
  body,
  title,
  onAgree,
  onCancel,
  open,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title"> {title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onCancel()}>
          {t("cancel")}
        </Button>
        <Button color="primary" onClick={() => onAgree()} autoFocus>
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popper;
