import { IAuctionDetails } from "../Auctions";
import { IDataComponentProps } from "../IDataComponentProps";

export interface IAuctionDetailsHeaderProps
  extends IDataComponentProps<Omit<IAuctionDetails, "description">> {}
