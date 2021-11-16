import React from "react";
import {AddAuctionType } from "../../Types/Auction";

export interface IAuctionTimePickerProps {
    setAuction : React.Dispatch<React.SetStateAction<AddAuctionType>>;
    auction : AddAuctionType;
    margin : any
}