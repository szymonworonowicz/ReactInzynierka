import React, { useState } from "react";
import { IPasswordFieldProps } from "../../../Interfaces/Shared/PasswordField/";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import {useFormContext, FieldError} from 'react-hook-form'

const PasswordField: React.FC<IPasswordFieldProps> = ({
  className,
  fieldName,
  onChange,
  value,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { t } = useTranslation();
  const {formState} = useFormContext();
     
  const handleClickShowPassword = () => {
    setPasswordVisible((prev) => !prev);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <TextField
      id={fieldName}
      name={fieldName}
      label={t(fieldName)}
      error={formState?.errors[fieldName] && formState?.errors[fieldName]?.value !== undefined}
      helperText= {(formState?.errors[fieldName] as FieldError)?.message}
      type={passwordVisible ? "text" : "password"}
      value={value}
      onChange={onChange}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;