import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PasswordField from "../Components/Shared/PasswordField/PasswordField";
import { ILoginCredentials } from "../Interfaces/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

const LoginForm: React.FC = () => {
  const {register, setValue } = useFormContext();
  const [credentials, setCredentials]  = useState<ILoginCredentials>({
    password:'',
    username:''
  })

  const { t } = useTranslation();
  const classes = useStyles();

  const onCredentialsChange = (e : any) => {
    const{value, id} = e.target;
    setCredentials(prev => {
      return {
        ...prev,
        [id] : value
      }
    })
    setValue(`${id}`, value);
  }

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input type="hidden" {...register("username", {required: true})} />
        <input type="hidden" {...register("password", {required: true})} />
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor='username'>{t("username")}</InputLabel>
            <Input 
              id='username'
              autoFocus
              fullWidth
              value={credentials.username}
              onChange={onCredentialsChange}  
            />

          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            className = {classes.margin}
            fieldName="password"
            onChange = {onCredentialsChange}
            value = {credentials.password}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
