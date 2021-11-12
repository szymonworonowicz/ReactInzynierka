import { IAuction } from "../Auctions";
import { IDataComponentProps } from "../IDataComponentProps";

export interface IAuctionListElementProps
  extends IDataComponentProps<IAuction> {
    hideStatus:boolean;
  }
