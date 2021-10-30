import React, { useState } from "react";
import { authService } from "../../Services/Auth/Auth.service";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  Button
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { IResetPassword } from "../../Interfaces/user";
import {useToast} from '../../shared/hooks/useToast'

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
  const [resetPasswordData, setResetPasswordData] = useState<IResetPassword>({
    token: token,
    newPassword: "",
    password: "",
  });

  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const { register, setValue, handleSubmit } = useForm();
  const toast = useToast();

  const handleDataChange = (e: any) => {
    const { value, id } = e.target;
    setResetPasswordData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(`${id}`, value);
  };

  const submitData = async (data : IResetPassword) : Promise<void> => {
    authService.resetPassword(data)
    .then(response => {
      if(response) {
          toast(t('success_password_change'),'success')
          setTimeout(() => {
              history.push('/');
          },3000)
      }
      else {
          toast(t('success_password_change'),'success')
      }
    })
  }

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input
          type="hidden"
          {...register("token", { required: true })}
          value={token}
        />
        <input type="hidden" {...register("newPassword", { required: true })} />
        <input type="hidden" {...register("password", { required: true })} />
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="password">{t("temporaryPassword")}</InputLabel>
            <Input
              id="password"
              autoFocus
              fullWidth
              value={resetPasswordData.password}
              onChange={handleDataChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="newPassword">{t("newPassword")}</InputLabel>
            <Input
              id="newPassword"
              autoFocus
              fullWidth
              value={resetPasswordData.newPassword}
              onChange={handleDataChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Button onClick={handleSubmit(submitData)}>{t('Save')}</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordForm;
