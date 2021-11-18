import React, { useState, useRef } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IRegisterCredentials } from "../../Interfaces/Api";
import { useTranslation } from "react-i18next";
import PasswordField from "../../Components/Shared/PasswordField/PasswordField";
import {
  ValidatorType,
  getRegexTable,
  getValidator,
} from "../../Helpers/constans";

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

const RegisterForm: React.FC = () => {
  type FormCredentials = IRegisterCredentials & { confirmPassword: string };

  const [credentials, setCredentials] = useState<FormCredentials>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
    confirmPassword: "",
    userType: "",
  });
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormCredentials>();

  const classes = useStyles();
  const { t } = useTranslation();

  const password = useRef({});
  const validators = getRegexTable(t);

  password.current = watch("password", "");

  const formValidations = {
    firstName: getValidator(
      t,
      null,
      validators[ValidatorType.Alphabetic],
      true
    ),
    lastName: getValidator(t, null, validators[ValidatorType.Alphabetic], true),
    userName: getValidator(
      t,
      null,
      validators[ValidatorType.AlphaNumeric],
      true
    ),
    email: getValidator(t, null, validators[ValidatorType.Email], true),
    password: getValidator(
      t,
      null,
      validators[ValidatorType.Password],
      true,
      6
    ),
    confirmPassword: getValidator(
      t,
      null,
      validators[ValidatorType.Password],
      true,
      6,
      (value) =>
        value === password.current ? true : (t("PasswordNotMatched") as string)
    ),
  };

  const handleCredentialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setCredentials((prev) => {
      return { ...prev, [id]: value };
    });
    setValue(id as keyof FormCredentials, value);
  };

  console.log(errors);

  return (
    <form>
      <Grid
        container
        spacing={1}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <input type="hidden" {...register("email", formValidations.email)} />
        <input
          type="hidden"
          {...register("firstName", formValidations.firstName)}
        />
        <input
          type="hidden"
          {...register("lastName", formValidations.lastName)}
        />
        <input
          type="hidden"
          {...register("userName", formValidations.userName)}
        />
        <input
          type="hidden"
          {...register("password", formValidations.password)}
        />

        <input
          type="hidden"
          {...register("confirmPassword", formValidations.confirmPassword)}
        />
        <Grid item xl={12}>
          <TextField
            id="userName"
            name="userName"
            error={errors.userName && errors.userName.message !== undefined}
            label={t("userName")}
            helperText={(errors.userName as FieldError)?.message}
            autoFocus
            fullWidth
            value={credentials.userName}
            onChange={handleCredentialChange}
          />
        </Grid>
        <Grid item xl={6}>
          <TextField
            id="firstName"
            name="firstName"
            error={errors.firstName && errors.firstName.message !== undefined}
            label={t("firstName")}
            helperText={(errors.firstName as FieldError)?.message}
            fullWidth
            value={credentials.firstName}
            onChange={handleCredentialChange}
          />
        </Grid>
        <Grid item xl={6}>
          <TextField
            id="lastName"
            name="lastName"
            fullWidth
            error={errors.lastName && errors.lastName.message !== undefined}
            label={t("lastName")}
            helperText={(errors.lastName as FieldError)?.message}
            value={credentials.lastName}
            onChange={handleCredentialChange}
          />
        </Grid>
        <Grid item xs={6}>
          <PasswordField
            fieldName="password"
            value={credentials.password}
            onChange={handleCredentialChange}
            className={classes.margin}
          />
        </Grid>
        <Grid item xs={6}>
          <PasswordField
            fieldName="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleCredentialChange}
            className={classes.margin}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            fullWidth
            error={errors.email && errors.email.message !== undefined}
            label={t("email")}
            name="email"
            helperText={(errors.email as FieldError)?.message}
            value={credentials.email}
            onChange={handleCredentialChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
