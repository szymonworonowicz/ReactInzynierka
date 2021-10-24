import React, { useState } from "react";
import inpost from "../../../../Logos/inpost.png";
import dpd from "../../../../Logos/dpd.jpg";
import { Grid, Button } from "@material-ui/core";
import { IAuctionConfirmDeliveryCompanyProps } from "./IAuctionConfirmDeliveryCompanyProps";
import { makeStyles } from "@material-ui/styles";
import Popper from "../../../../shared/Popper/Popper";
import { useTranslation } from "react-i18next";
import InpostModal from "./InpostModal/InpostModal";
import clsx from "clsx";
import SameAddress from "../AuctionConfirmDeliveryAddress/SameAddress/SameAddress";
import { useFormContext } from "react-hook-form";

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
  },
  photo: {
    height: "100px",
    width: "100px",
  },
  selected: {
    border: "1px solid red",
  },
  firstOpt: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
const AuctionConfirmDeliveryCompany: React.FC<IAuctionConfirmDeliveryCompanyProps> =
  ({ city }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {setValue, getValues} = useFormContext();

    const [openInpostModal, setOpenInpostModal] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number>(!Boolean(getValues()['inpost']) ? 0 : 1);

    const handleInpostClick = (): void => {
      setOpenInpostModal(true);
      setSelectedOption(0);
      setValue('inpost', true);
    };

    const handleDPDClick = (): void => {
      setSelectedOption(1);
      setValue('inpost', false);
      
    };

    return (
      <>
        <Popper
          open={openInpostModal}
          title={t("chooseParcel")}
          onCancel={() => setOpenInpostModal(false)}
          body={
            <InpostModal
              city={city}
              handleClose={() => setOpenInpostModal(false)}
            />
          }
          showSave={false}
          maxWidth="lg"
        ></Popper>
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} className={classes.firstOpt}>
              <Button onClick={handleInpostClick}>
                <img
                  className={clsx({
                    [classes.photo]: true,
                    [classes.selected]: selectedOption === 0,
                  })}
                  alt="inpost"
                  src={inpost}
                  height=""
                  width=""
                ></img>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleDPDClick}>
                <img
                  className={clsx({
                    [classes.photo]: true,
                    [classes.selected]: selectedOption === 1,
                  })}
                  alt="dpd"
                  src={dpd}
                  height=""
                  width=""
                ></img>
              </Button>
            </Grid>{" "}
            {selectedOption === 1 && <SameAddress />}
          </Grid>
        </div>
      </>
    );
  };

export default AuctionConfirmDeliveryCompany;
