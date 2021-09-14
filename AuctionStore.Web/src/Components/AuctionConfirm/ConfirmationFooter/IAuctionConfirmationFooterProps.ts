import React from "react";

export interface IAuctionConfirmationFooterProps  {
    setCurrentStep : React.Dispatch<React.SetStateAction<number>>;
    currentStep: number;
}