import React from "react";
import { IUserInfoPaper } from "./IUserInfoPaper";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    // padding:'4vw 10% 5%',
    padding:'20px'
  },
  content: {},
}));

const UserInfoPaper: React.FC<IUserInfoPaper> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">{t("nick")}: {data?.userName}</Typography>
        </Grid>        
        <Grid item xs={12}>
          <Typography variant="h5">{t("firstName")}: {data?.firstName} </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("lastName")}: {data?.lastName}</Typography>
        </Grid>        
        <Grid item xs={12}>
          <Typography variant="h5">{t("email")}: {data?.email}</Typography>
        </Grid>        
      </Grid>
    </div>
  );
};

export default UserInfoPaper;
