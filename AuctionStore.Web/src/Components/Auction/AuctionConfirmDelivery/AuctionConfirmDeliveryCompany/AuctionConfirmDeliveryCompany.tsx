import React, { useState } from "react";
import inpost from "../../../../Logos/inpost.png";
import { Grid, Button } from "@material-ui/core";
import { IAuctionConfirmDeliveryCompanyProps } from "./IAuctionConfirmDeliveryCompanyProps";
import { makeStyles } from "@material-ui/styles";
import Popper from "../../../../shared/Popper/Popper";
import { useTranslation } from "react-i18next";
import InpostModal from './InpostModal/InpostModal'

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
  },
  photo: {
    height: "100px",
    width: "100px",
  },
});
const AuctionConfirmDeliveryCompany: React.FC<IAuctionConfirmDeliveryCompanyProps> =
  ({city}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [openInpostModal, setOpenInpostModal] = useState<boolean>(false);

    const handleInpostClick = () => {
      setOpenInpostModal(true);
    };

    return (
      <>
      <Popper
        open={openInpostModal}
        title={t('chooseParcel')}
        onCancel = {() => setOpenInpostModal(false)}
        body={<InpostModal city={city} handleClose={() => setOpenInpostModal(false)}/>}
        showSave={false}
        maxWidth="lg"
      >

      </Popper>
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Button onClick={handleInpostClick}>
                <img
                  className={classes.photo}
                  alt="inpost"
                  src={inpost}
                  height=""
                  width=""
                ></img>
              </Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  };

export default AuctionConfirmDeliveryCompany;
