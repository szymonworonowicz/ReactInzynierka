import React, {useState} from "react";
import { Grid, FormControl, Input, InputLabel } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { IResetPasswordRequired } from "../../Interfaces/user";

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

const ResetPasswordRequiredForm : React.FC = () => {
    const { setValue, register } = useFormContext();
    const classes = useStyles();
    const {t} = useTranslation();

    const [credentials, setCredentials] = useState<IResetPasswordRequired>( {
        email:''
    });

    const onCredentialChange = (e: any) => {
        const { value, id } = e.target;
        setCredentials((prev) => {
          return { ...prev, [id]: value };
        });
        setValue(`${id}`, value);
      };

    return (
        <form>
            <Grid container spacing={1} justify={"center"} alignContent={"center"}>
                <input type="hidden" {...register("email", { required: true })} />
                <Grid item xl={12}>
                <FormControl className={clsx(classes.margin)} fullWidth>
                    <InputLabel htmlFor="userName">{t("email")}</InputLabel>
                    <Input
                    id="email"
                    autoFocus
                    fullWidth
                    value={credentials.email}
                    onChange={onCredentialChange}
                    />
                </FormControl>
                </Grid>
            </Grid>
        </form>
    )

}

export default ResetPasswordRequiredForm;