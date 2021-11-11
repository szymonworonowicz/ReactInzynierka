import React from "react";
import { IAddressContainerProps } from "./IAddressContainerProps";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
    root: {
        position:'relative',
        paddingTop:'10px'
    },
    button : {
        position:'absolute',
        top:'3px',
        right:'3px'
    }
})

const AddressContainer: React.FC<IAddressContainerProps> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();


  return (
    <div className={classes.root}>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h5">
            {t("city")}: {data.city}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {t("postCode")}: {data.postCode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {t("street")}: {data.street}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {t("houseNo")}: {data.houseNo}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressContainer;
