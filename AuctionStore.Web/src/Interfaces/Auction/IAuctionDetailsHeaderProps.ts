import {AuctionDetailsType } from "../../Types/Auction";
import { IDataComponentProps } from "../IDataComponentProps";

export interface IAuctionDetailsHeaderProps
  extends IDataComponentProps<Omit<AuctionDetailsType, "description">> {}
