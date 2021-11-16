import { AuctionDetailsType } from "../../Types/Auction";
import { IDataComponentProps } from "../IDataComponentProps";

export interface IRemainingTimeCounterProps
  extends IDataComponentProps<
    Pick<
      AuctionDetailsType,
      "timeStampDuration" | "timeStampEnd" | "timeStampStart"
    >
  > {}
