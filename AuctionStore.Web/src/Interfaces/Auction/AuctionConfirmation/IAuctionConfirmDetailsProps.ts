import React from "react";
import { IAuctionConfirmation } from "../../Auctions";

export interface IAuctionConfirmDetailsProps {
    id : string;
    setConfirmation : React.Dispatch<React.SetStateAction<IAuctionConfirmation>>;
    confirmation: IAuctionConfirmation;
}