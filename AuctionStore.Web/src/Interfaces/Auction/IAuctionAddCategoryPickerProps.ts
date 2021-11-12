import React from "react";
import {IAddAuction} from '../Auctions';

export interface IAuctionAddCategoryPickerProps {
    setAuction : React.Dispatch<React.SetStateAction<IAddAuction>>;
    auction : IAddAuction;
}