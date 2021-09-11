import React from "react";
import { IUserInfoPaper } from "./IUserInfoPaper";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment'

const useStyles = makeStyles(() => ({
  root: {
    // padding:'4vw 10% 5%',
  },
  content: {},
}));

const UserInfoPaper: React.FC<IUserInfoPaper> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h5">{t("name")}: {data?.firstName ?? "Janusz"} </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{t("surname")}: {data?.lastName ?? "zabieraj"}</Typography>
        </Grid>        
        <Grid item xs={6}>
          <Typography variant="h5">{t("email")}: {data?.email ?? "email@template.com"}</Typography>
        </Grid>        
        <Grid item xs={6}>
          <Typography variant="h5">{t("nick")}: {data?.userName ?? "kabanosiek"}</Typography>
        </Grid>        
        <Grid item xs={6}>
          <Typography variant="h5">{t("lastLogin")}: {moment(data?.lastLoginDateUtc).format('MM-DD-YYYY') ?? "zabieraj"}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserInfoPaper;