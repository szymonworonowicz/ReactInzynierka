import React, { useState , useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Grid} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import PasswordField from "../../Components/Shared/PasswordField/PasswordField";
import { IChangePassword } from "../../Interfaces/user/IChangePassword";
import { UserContext } from "../../Context/UserContext";

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

const ChangePasswordForm: React.FC = () => {
  const { register, setValue } = useFormContext();
  const context = useContext(UserContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const [changePasswordData, setChangePasswordData] = useState<IChangePassword>(
    {
      newPassword: "",
      oldPassword: "",
      userId : context.userId
    }
  );

  const onCredentialsChange = (e: any) => {
    const { value, id } = e.target;
    setChangePasswordData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(`${id}`, value);
  };

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input type="hidden" {...register("oldPassword", { required: true })} />
        <input type="hidden" {...register("newPassword", { required: true })} />
        <Grid item xs={12}>
          <PasswordField
            className={classes.margin}
            fieldName="oldPassword"
            onChange={onCredentialsChange}
            value={changePasswordData.oldPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            className={classes.margin}
            fieldName="newPassword"
            onChange={onCredentialsChange}
            value={changePasswordData.newPassword}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
