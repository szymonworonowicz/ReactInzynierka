import React from "react";
import { IAuctionConfirmation } from "../../../Interfaces/Auctions";

export interface IAuctionConfirmDetailsProps {
    id : string;
    setConfirmation : React.Dispatch<React.SetStateAction<IAuctionConfirmation>>;
    confirmation: IAuctionConfirmation;
}