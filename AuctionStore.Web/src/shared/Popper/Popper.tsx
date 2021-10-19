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
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

type Props = {
  width: string;
};

// const useStyles  = (props : Props) => {
//     const {width} = props;

//     return makeStyles({
//       root: {
//         width: width
//       }
//     })
// }

const Popper: React.FC<IPopperProps> = ({
  body,
  title,
  onAgree = () => {},
  onCancel = () => {},
  open,
  showCancel = true,
  showSave = true,
  maxWidth = "sm",
}) => {
  const { t } = useTranslation();
  // const classes = useStyles({width})
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title"> {title}</DialogTitle>}
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
