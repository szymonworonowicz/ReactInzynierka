import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ConfirmationStepper from "../Components/AuctionConfirm/ConfirmationStepper/ConfirmationStepper";
import AuctionConfirmationFooter from "../Components/AuctionConfirm/ConfirmationFooter/AuctionConfirmationFooter";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IAuctionConfirmation } from "../Interfaces/Auctions";
import AuctionConfirmDetails from "../Components/Auction/AuctionConfirmDetail/AuctionConfirmDetails";
import AuctionConfirmDelivery from "../Components/Auction/AuctionConfirmDelivery/AuctionConfirmDelivery";
import AuctionConfirmPayment from "../Components/Auction/AuctionConfirmPayment/AuctionConfirmPayment";
import AuctionDeliveryConfirmation from "../Components/Auction/AuctionDeliveryConfirmation/AuctionDeliveryConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import {IAuctionConfirmationForm} from '../Interfaces/Auctions'

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: " 10vh 10% 10vh",
    flexDirection: "column",
    width: "80%",
    height: "80vh",
    justifyContent: "space-between",
  },
  content: {
    marginTop: "50px",
    padding: '0rem 10rem'
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  footerButtons: {},
  body: {},
});

type AuctionDefailsRouteInfo = {
  id: string;
};
interface IAuctionConfirmationProps
  extends RouteComponentProps<AuctionDefailsRouteInfo> {}

const AuctionConfirmation: React.FC<IAuctionConfirmationProps> = ({
  match,
}) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [auctionConfirmation, setAuctionConfirmation] =
    useState<IAuctionConfirmation>({
      message: "",
    });

  const classes = useStyles();

  const { id } = match.params;
  const methods = useForm<IAuctionConfirmationForm>({
    defaultValues : {
      auctionId:id,
      inpost : true,
      selectedPayment : 1,
      sameAddress:false,
      address : {
        
      }
    }
  });

  return (
    <div className={classes.root}>
      <FormProvider {...methods}>
        <div className={classes.body}>
          <ConfirmationStepper actualStep={selectedStep} />
          <div className={classes.content}>
            {selectedStep === 0 && (
              <AuctionConfirmDetails
                confirmation={auctionConfirmation}
                id={id}
                setConfirmation={setAuctionConfirmation}
              />
            )}
            {selectedStep === 1 && <AuctionConfirmDelivery />}
            {selectedStep === 2 && <AuctionConfirmPayment />}
            {selectedStep === 3 && <AuctionDeliveryConfirmation />}
          </div>
        </div>

        <div className={classes.footer}>
          <AuctionConfirmationFooter
            setCurrentStep={setSelectedStep}
            currentStep={selectedStep}
          />
        </div>
      </FormProvider>
    </div>
  );
};

export default withRouter(AuctionConfirmation);
