import React, {useState} from "react";
import { makeStyles } from "@material-ui/core";
import ConfirmationStepper from '../Components/AuctionConfirm/ConfirmationStepper/ConfirmationStepper';
import AuctionConfirmationFooter from '../Components/AuctionConfirm/ConfirmationFooter/AuctionConfirmationFooter';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IAuctionConfirmation } from "../Interfaces/Auctions";
import AuctionConfirmDetails from '../Components/Auction/AuctionConfirmDetail/AuctionConfirmDetails';
import AuctionConfirmDelivery from '../Components/Auction/AuctionConfirmDelivery/AuctionConfirmDelivery'


const useStyles = makeStyles({
    root: {
        position:'absolute',
        top:'10%',
        left:'10%',
        width:'80%'
    },
    content : {
        marginTop:'50px'
    },
    footer: {
        position: 'relative',
        bottom:'5%',
        display:'flex',
        justifyContent:'flex-end',
    },
    footerButtons : {

    }
})

type AuctionDefailsRouteInfo = {
    id: string;
  };
  interface IAuctionConfirmationProps
    extends RouteComponentProps<AuctionDefailsRouteInfo> {}

const AuctionConfirmation : React.FC<IAuctionConfirmationProps> = ({match}) => {
    const [selectedStep, setSelectedStep] = useState<number>(0);
    const [auctionConfirmation, setAuctionConfirmation] = useState<IAuctionConfirmation>({
        message : "",
    })

    const classes = useStyles();
    
    const {id } = match.params;
    
    return (
        <div className={classes.root}>
            <ConfirmationStepper  actualStep={selectedStep}/>
            <div className={classes.content}>
                {selectedStep === 0 && (
                    <AuctionConfirmDetails confirmation={auctionConfirmation} id={id} setConfirmation={setAuctionConfirmation}/>
                )}
                {selectedStep === 1 && (
                    <AuctionConfirmDelivery />
                )
                }
            </div>
            <div className={classes.footer}>
                <AuctionConfirmationFooter setCurrentStep = {setSelectedStep} currentStep={selectedStep}/>
            </div>
        </div>
    )
}

export default withRouter(AuctionConfirmation);