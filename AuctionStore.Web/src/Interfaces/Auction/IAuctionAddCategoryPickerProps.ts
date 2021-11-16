import React from "react";
import {AddAuctionType} from '../../Types/Auction';

export interface IAuctionAddCategoryPickerProps {
    setAuction : React.Dispatch<React.SetStateAction<AddAuctionType>>;
    auction : AddAuctionType;
}