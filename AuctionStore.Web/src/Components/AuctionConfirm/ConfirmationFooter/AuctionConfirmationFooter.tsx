import React, { useContext } from "react";
import { IAuctionConfirmationFooterProps } from "./IAuctionConfirmationFooterProps";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { useFormContext } from "react-hook-form";
import {IAuctionConfirmationForm} from '../../../Interfaces/Auctions'
import { AuctionApi } from "../../../Services/Auction/Auction.service";
import { UserContext } from "../../../Context/UserContext";

const useStyles = makeStyles({
  root: {
    "& > button": {
      margin: "10px",
    },
  },
});

const AuctionConfirmationFooter: React.FC<IAuctionConfirmationFooterProps> = ({
  setCurrentStep,
  currentStep,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {handleSubmit} = useFormContext();
  const context = useContext(UserContext);

  const handlePrev = (): void => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = (): void => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSave = (data : IAuctionConfirmationForm): void => {
    AuctionApi.confirmAuction(data, context.userId)
      .then(response => {
        const {paymentLink } = response;
        if(paymentLink !== '' ) {
          window.location.href = paymentLink
        }
      })

  };
  
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        disabled={currentStep === 0}
        onClick={handlePrev}
      >
        {t("back")}
      </Button>
      {currentStep !== 3 ? (
        <Button
          variant="contained"
          disabled={currentStep === 3}
          onClick={handleNext}
        >
          {t("next")}
        </Button>
      ) : (
        <Button variant="contained" onClick={handleSubmit(handleSave)}>
          {t("save")}
        </Button>
      )}
    </div>
  );
};

export default AuctionConfirmationFooter;
