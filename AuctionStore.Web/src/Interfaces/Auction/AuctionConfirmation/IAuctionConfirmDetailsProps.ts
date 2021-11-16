import React from "react";
import {AuctionConfirmationType } from "../../../Types/Auction";

export interface IAuctionConfirmDetailsProps {
    id : string;
    setConfirmation : React.Dispatch<React.SetStateAction<AuctionConfirmationType>>;
    confirmation: AuctionConfirmationType;
}