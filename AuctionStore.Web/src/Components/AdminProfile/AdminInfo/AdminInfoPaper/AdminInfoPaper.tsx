import React, { useState } from "react";
import { IAdminInfoPaper } from "./IAdminInfoPaper";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    // padding:'4vw 10% 5%',
  },
  content: {},
}));

const AdminInfoPaper: React.FC<IAdminInfoPaper> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h5">{t("name")}: {data?.FirstName ?? "Janusz"} </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{t("surname")}: {data?.LastName ?? "zabieraj"}</Typography>
        </Grid>        
        <Grid item xs={6}>
          <Typography variant="h5">{t("email")}: {data?.Email ?? "email@template.com"}</Typography>
        </Grid>        
        <Grid item xs={6}>
          <Typography variant="h5">{t("nick")}: {data?.UserName ?? "kabanosiek"}</Typography>
        </Grid>        
        <Grid item xs={6}>
          <Typography variant="h5">{t("lastLogin")}: {data?.LastName ?? "zabieraj"}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminInfoPaper;
