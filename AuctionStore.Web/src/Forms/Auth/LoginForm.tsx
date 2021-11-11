import React, { useState } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import {
  Grid,
  Typography,
  Link,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import PasswordField from "../../Components/Shared/PasswordField/PasswordField";
import { ILoginCredentials } from "../../Interfaces/Api";
import { getValidator } from "../../Helpers/constans";

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

type ILoginFormProps = {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm: React.FC<ILoginFormProps> = ({
  setLogin,
  setRegister,
  setResetPassword,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ILoginCredentials>();
  const [credentials, setCredentials] = useState<ILoginCredentials>({
    password: "",
    username: "",
  });

  const { t } = useTranslation();
  const classes = useStyles();

  const formValidators = {
    username: getValidator(t, null, null, true),
    password: getValidator(t, null, null, true),
  };

  const handleCredentialsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.currentTarget;
    setCredentials((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as (keyof ILoginCredentials), value);
  };

  const handleResetPassword = () => {
    setLogin(false);
    setResetPassword(true);
  };

  const handleRegister = () => {
    setLogin(false);
    setRegister(true);
  };

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input
          type="hidden"
          {...register("username", formValidators.username)}
        />
        <input
          type="hidden"
          {...register("password", formValidators.password)}
        />
        <Grid item xs={12}>
          <TextField
            id="username"
            name="username"
            autoFocus
            fullWidth
            value={credentials.username}
            onChange={handleCredentialsChange}
            error={
              errors.username && errors.username.message !== undefined
            }
            helperText={(errors.username as FieldError)?.message}
            label={t("username")}
            // className={clsx(classes.margin)}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            className={classes.margin}
            fieldName="password"
            onChange={handleCredentialsChange}
            value={credentials.password}
          />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography>
              <Link href="#" onClick={handleResetPassword}>
                {t("rememberPassword")}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Link href="#" onClick={handleRegister}>
                {t("register")}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
