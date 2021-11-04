import React, { useState, useRef } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IRegisterCredentials } from "../../Interfaces/Api";
import { useTranslation } from "react-i18next";
import PasswordField from "../../Components/Shared/PasswordField/PasswordField";
import {
  ValidatorType,
  getRegexTable,
  getValidator
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
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const classes = useStyles();
  const { t } = useTranslation();

  const password = useRef({});
  const validators = getRegexTable(t);

  password.current = watch("password", "");

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

  const formValidations: any = {
    firstName: getValidator(
      t,
      null,
      validators[ValidatorType.Alphabetic],
      true
    ),
    lastName: getValidator(t, null, validators[ValidatorType.Alphabetic], true),
    userName: getValidator(t, null, validators[ValidatorType.AlphaNumeric], true),
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

  const handleCredentialChange = (e: any) => {
    const { value, id } = e.target;
    setCredentials((prev) => {
      return { ...prev, [id]: value };
    });
    setValue(`${id}`, value);
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
              error={
                errors["userName"] && errors["userName"]?.value !== undefined
              }
              label={t("userName")}
              helperText={(errors["userName"] as FieldError)?.message}
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
              error={
                errors["firstName"] && errors["firstName"]?.value !== undefined
              }
              label={t("firstName")}
              helperText={(errors["firstName"] as FieldError)?.message}
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
            error={
              errors["lastName"] && errors["lastName"]?.value !== undefined
            }
            label={t("lastName")}
            helperText={(errors["lastName"] as FieldError)?.message}
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
            error={errors["email"] && errors["email"]?.value !== undefined}
            label={t("email")}
            name="email"
            helperText={(errors["email"] as FieldError)?.message}
            value={credentials.email}
            onChange={handleCredentialChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
