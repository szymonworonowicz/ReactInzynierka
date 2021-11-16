import {AuctionType} from '../../Types/Auction';
import { IDataComponentProps } from "../IDataComponentProps";

export interface IAuctionListElementProps
  extends IDataComponentProps<AuctionType> {
    hideStatus:boolean;
  }
