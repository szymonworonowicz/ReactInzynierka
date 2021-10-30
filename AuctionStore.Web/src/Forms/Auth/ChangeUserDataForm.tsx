import React from "react";
import { useFormContext } from "react-hook-form";
import { Grid, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { IUserDto } from "../../Interfaces/user";

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

const ChangeUserDataForm: React.FC = () => {
  const { register, setValue, getValues } = useFormContext();
  const [data, setData] = React.useState<IUserDto>(getValues() as IUserDto);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(`${id}`, value);
  };

  return (
    <>
      <form>
        <Grid container spacing={1} justify={"center"} alignContent={"center"}>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="firstName">{t("firstName")}</InputLabel>
              <Input
                id="firstName"
                autoFocus
                fullWidth
                value={data.firstName}
                onChange={handleChangeUserData}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="lastName">{t("lastName")}</InputLabel>
              <Input
                id="lastName"
                autoFocus
                fullWidth
                value={data.lastName}
                onChange={handleChangeUserData}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="email">{t("email")}</InputLabel>
              <Input
                id="email"
                autoFocus
                fullWidth
                value={data.email}
                onChange={handleChangeUserData}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangeUserDataForm;
