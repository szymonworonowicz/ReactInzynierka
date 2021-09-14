import React from "react";
import { IConfirmationStepperProps } from "./IConfirmationStepperProps";
import {Stepper, Step, StepLabel } from '@material-ui/core';
import {ColorConnector} from './CustomStepperComponents';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import ColorStepIcon from './ColorStepIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '10vh'
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepper : {
      backgroundColor : "transparent"
    }
  }),
);

const ConfirmationStepper : React.FC<IConfirmationStepperProps> = ({actualStep}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const steps = [
        t('auctionDetails'),
        t('deliveryAuction'),
        t('paymentAuction'),
        t('confirmAuction')
    ]
    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={actualStep} connector={<ColorConnector/>} className={classes.stepper  }>
                {
                    steps.map((label, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel StepIconComponent={ColorStepIcon}>{label}</StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>
        </div>
    )
}

export default ConfirmationStepper;
