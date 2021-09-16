import React from "react";
import {IAddAuction} from '../../../Interfaces/Auctions';

export interface IAuctionAddCategoryPickerProps {
    setAuction : React.Dispatch<React.SetStateAction<IAddAuction>>;
    auction : IAddAuction;
}