import React, { useState } from "react";
import { authService } from "../../Services/Auth/Auth.service";
import { Grid, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useForm, FieldError } from "react-hook-form";
import { ResetPasswordType } from "../../Types/User/";
import { useToast } from "../../shared/hooks/useToast";
import {
  getRegexTable,
  getValidator,
  ValidatorType,
} from "../../Helpers/constans";
import PasswordField from "../../Components/Shared/PasswordField/PasswordField";

interface IResetPasswordProps {
  token: string;
}

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

const ResetPasswordForm: React.FC<IResetPasswordProps> = ({ token }) => {
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordType>({
    token: token,
    newPassword: "",
    password: "",
  });

  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>();
  const toast = useToast();
  const regexTable = getRegexTable(t);

  const formValidators = {
    password: getValidator(t, null, regexTable[ValidatorType.Email], true),
    newPassword: getValidator(t, null, regexTable[ValidatorType.Email], true),
  };

  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setResetPasswordData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as (keyof ResetPasswordType), value);
  };

  const submitData = async (data: ResetPasswordType): Promise<void> => {
    authService.resetPassword(data).then((response) => {
      if (response) {
        toast(t("success_password_change"), "success");
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        toast(t("success_password_change"), "success");
      }
    });
  };

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input
          type="hidden"
          {...register("token", { required: true })}
          value={token}
        />
        <input
          type="hidden"
          {...register("newPassword", formValidators.newPassword)}
        />
        <input
          type="hidden"
          {...register("password", formValidators.newPassword)}
        />
        <Grid item xs={12}>
          <TextField
            className={classes.margin}
            id="password"
            name="password"
            fullWidth
            autoFocus
            value={resetPasswordData.password}
            onChange={handleDataChange}
            error={
              errors.password && errors.password?.message !== undefined
            }
            helperText={(errors.password as FieldError)?.message}
            label={t("temporaryPassword")}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            className={classes.margin}
            fieldName="handleDataChange"
            onChange={handleDataChange}
            value={resetPasswordData.newPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit(submitData)}>{t("Save")}</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordForm;
