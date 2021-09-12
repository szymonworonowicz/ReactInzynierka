import React from "react";
import { IAddAuction } from "../../../Interfaces/Auctions";

export interface IAuctionTimePickerProps {
    setAuction : React.Dispatch<React.SetStateAction<IAddAuction>>;
    auction : IAddAuction;
    margin : any
}