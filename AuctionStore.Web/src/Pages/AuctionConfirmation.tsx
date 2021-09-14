import React, {useState} from "react";
import { makeStyles } from "@material-ui/core";
import ConfirmationStepper from '../Components/AuctionConfirm/ConfirmationStepper/ConfirmationStepper';
import AuctionConfirmationFooter from '../Components/AuctionConfirm/ConfirmationFooter/AuctionConfirmationFooter';

const useStyles = makeStyles({
    root: {
        position:'absolute',
        top:'10%',
        left:'10%',
        width:'80%'
    },
    content : {

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

const AuctionConfirmation : React.FC = () => {
    const [selectedStep, setSelectedStep] = useState<number>(0);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ConfirmationStepper  actualStep={selectedStep}/>
            <div>

            </div>
            <div className={classes.footer}>
                <AuctionConfirmationFooter setCurrentStep = {setSelectedStep} currentStep={selectedStep}/>
            </div>
        </div>
    )
}

export default AuctionConfirmation;