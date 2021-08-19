import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Grid, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { IRegisterCredentials } from "../Interfaces/Api";
import { useTranslation } from "react-i18next";
import PasswordField from "../Components/Shared/PasswordField/PasswordField";
import { ValidatorType, getValidators } from "../Helpers/constans";

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
  const { setValue, register, watch } = useFormContext();

  const classes = useStyles();
  const { t } = useTranslation();

  const password = useRef({});
  const validators = getValidators();

  useEffect(() => {
    password.current = watch("password", "");
  }, [watch]);

  type FormCredentials = IRegisterCredentials & { confirmPassword: string };

  const [credentials, setCredentials] = useState<FormCredentials>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
    confirmPassword: "",
    userType: "User",
  });

  const onCredentialChange = (e: any) => {
    const { value, id } = e.target;
    setCredentials((prev) => {
      return { ...prev, [id]: value };
    });
    setValue(`${id}`, value);
    console.log(credentials)
  };

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input
          type="hidden"
          {...register("email", {
            required: true,
            // pattern: {
            //   value: validators.get(ValidatorType.Email) ?? /$/,
            //   message: "must be a email",
            // },
          })}
        />
        <input type="hidden" {...register("firstName", { required: true })} />
        <input type="hidden" {...register("lastName", { required: true })} />
        <input type="hidden" {...register("userName", { required: true })} />
        <input
          type="hidden"
          {...register("password", {
            required: true,
            // pattern: {
            //   value: validators.get(ValidatorType.Password) ?? /$/,
            //   message: "password Validation",
            // },
          })}
        />
        <input
          type="hidden"
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === password.current || "Password not matched",
          })}
        />

        <Grid item xl={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="userName">{t("username")}</InputLabel>
            <Input
              id="userName"
              autoFocus
              fullWidth
              value={credentials.userName}
              onChange={onCredentialChange}
            />
          </FormControl>
        </Grid>
        <Grid item xl={6}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="firstName">{t("firstName")}</InputLabel>
            <Input
              id="firstName"
              fullWidth
              value={credentials.firstName}
              onChange={onCredentialChange}
            />
          </FormControl>
        </Grid>
        <Grid item xl={6}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="lastName">{t("lastName")}</InputLabel>
            <Input
              id="lastName"
              fullWidth
              value={credentials.lastName}
              onChange={onCredentialChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <PasswordField
            fieldName="password"
            value={credentials.password}
            onChange={onCredentialChange}
            className={classes.margin}
          />
        </Grid>
        <Grid item xs={6}>
          <PasswordField
            fieldName="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onCredentialChange}
            className={classes.margin}
          />
        </Grid>
        <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
                <InputLabel htmlFor="email">{t("email")}</InputLabel>
                <Input
                id="email"
                fullWidth
                value={credentials.email}
                onChange={onCredentialChange}
                />
            </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
