import React from "react";
import { IPopperProps } from "./IPopperProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  IconButton,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import {Close} from '@material-ui/icons'

const useStyles = makeStyles({
  close: {
    position:'absolute',
    top:'2px',
    right:'5px'
  },
  popper: {
    position:'relative'
  }
})

const Popper: React.FC<IPopperProps> = ({
  body,
  title,
  onAgree = () => {},
  onCancel = () => {},
  open,
  showCancel = true,
  showSave = true,
  maxWidth = "sm",
  hasCloseIcon
}) => {
  const { t } = useTranslation();
  const classes = useStyles()

  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.popper}
    >
      {title && (
        <DialogTitle id="alert-dialog-title">
          {title}
          {
            hasCloseIcon && (
              <IconButton className={classes.close} onClick={() => onCancel()} >
                <Close/>
              </IconButton>
            )
          }
          </DialogTitle>
          )
         }
      <DialogContent>
        {typeof body === "string" ? (
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        ) : (
          body
        )}
      </DialogContent>
      <DialogActions>
        {showCancel && (
          <Button color="primary" onClick={() => onCancel()}>
            {t("cancel")}
          </Button>
        )}
        {showSave && (
          <Button color="primary" onClick={() => onAgree()} autoFocus>
            {t("save")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Popper;
