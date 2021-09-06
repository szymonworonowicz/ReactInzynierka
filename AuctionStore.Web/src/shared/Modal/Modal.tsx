import React from "react";
import { IModalProps } from "./IModalProps";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";

const Modal: React.FC<IModalProps> = ({
  header,
  isOpen = false,
  handleClose = () => {},
  handleSave = () => {},
  initValue ={},
  children,
}) => {
  const methods = useForm({
    defaultValues: initValue
  });
  const { handleSubmit } = methods;

  const { t } = useTranslation();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{header} </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
            {children}
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t("cancel")}
        </Button>

        <Button onClick={handleSubmit(handleSave)} color="primary">
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
