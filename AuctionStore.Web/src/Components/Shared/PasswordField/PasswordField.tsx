import React,{useState} from "react";
import { IPasswordFieldProps } from "./IPasswordFieldProps";
import {FormControl, Input, InputLabel,InputAdornment, IconButton } from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const PasswordField : React.FC<IPasswordFieldProps> = ({className,fieldName, onChange , value }) => {
    
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const {t} = useTranslation();

    const preventAction = (e: any) => {
        e.preventDefault();
    }
  
    const handleClickShowPassword = () => {
      setPasswordVisible(prev => !prev);
    }  
    const handleMouseDownPassword = (e: any) => {
      e.preventDefault();
    };

    return (
      <FormControl className={clsx(className)} fullWidth>
            <InputLabel htmlFor={fieldName}>{t("password")}</InputLabel>
            <Input
              id={fieldName}
              type={passwordVisible ? "text" : "password"}
              value={value}
              onChange={onChange}
              onCopy={preventAction}
              onPaste={preventAction}
              onCut={preventAction}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
    )
}

export default PasswordField