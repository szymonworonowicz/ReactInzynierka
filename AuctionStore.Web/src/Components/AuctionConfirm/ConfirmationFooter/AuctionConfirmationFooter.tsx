import React from "react";
import { IAuctionConfirmationFooterProps } from "./IAuctionConfirmationFooterProps";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

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

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
      setCurrentStep((prev) => prev + 1);
  }
  
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        disabled={currentStep === 0}
        onClick={handlePrev}
      >
        {t("back")}
      </Button>
      <Button
        variant="contained"
        disabled={currentStep === 3}
        onClick={handleNext}
      >
        {t("next")}
      </Button>
    </div>
  );
};

export default AuctionConfirmationFooter;
