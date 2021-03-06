import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IUserAddressContainerPapperProps } from "../../../../../Interfaces/UserAddress";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    padding:'0 10px 20px'
  },
  content: {},
  iconStyle: {},
  navbar: {
    position: "relative",
  },
}));

const UserAddressContainerPapper: React.FC<IUserAddressContainerPapperProps> =
  ({ address, onDeleteAddress, onEditAddress }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleDeleteClick = () => {
      onDeleteAddress(address.id);
    };
    const handleEditClick = () => {
      onEditAddress(address.id);
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={11} />
          <Grid item xs={1}>
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <Edit/>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("city")}: {address.city}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("postCode")}: {address.postCode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("street")}: {address.street}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("houseNo")}: {address.houseNo}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  };

export default UserAddressContainerPapper;
