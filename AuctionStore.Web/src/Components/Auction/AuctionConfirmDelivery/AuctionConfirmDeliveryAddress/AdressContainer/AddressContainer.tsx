import React from "react";
import { IAddressContainerProps } from "./IAddressContainerProps";
import { IconButton, Grid, Typography, makeStyles } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
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

const AddressContainer: React.FC<IAddressContainerProps> = ({ data,setEditAddress }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleEditClick = () => {
      setEditAddress(true);
  }

  return (
    <div className={classes.root}>
        <div className={classes.button}>
            <IconButton onClick={handleEditClick}>
                <Edit/>
            </IconButton>
        </div>
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
