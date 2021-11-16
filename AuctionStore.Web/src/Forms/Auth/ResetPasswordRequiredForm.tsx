import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useFormContext, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { ResetPasswordRequiredType } from "../../Types/User/";
import { getValidator, ValidatorType, getRegexTable } from "../../Helpers/constans";

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

const ResetPasswordRequiredForm: React.FC = () => {
  const { setValue, register,formState:{errors} } = useFormContext<ResetPasswordRequiredType>();
  const classes = useStyles();
  const { t } = useTranslation();
  const regexTable = getRegexTable(t);

  const [credentials, setCredentials] = useState<ResetPasswordRequiredType>({
    email: "",
  });

  const handleCredentialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setCredentials((prev) => {
      return { ...prev, [id]: value };
    });
    setValue(id as (keyof ResetPasswordRequiredType), value);
  };

  const formValidators = {
    email:getValidator(t,null,regexTable[ValidatorType.Email],true),
  }

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input type="hidden" {...register("email", formValidators.email)} />
        <Grid item xl={12}>
          <TextField
            id="email"
            name="email"
            autoFocus
            fullWidth
            value={credentials.email}
            onChange={handleCredentialChange}
            error={
              errors.email && errors.email.message !== undefined
            }
            helperText={(errors.email as FieldError)?.message}
            label={t("email")}
            className={classes.margin}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordRequiredForm;
