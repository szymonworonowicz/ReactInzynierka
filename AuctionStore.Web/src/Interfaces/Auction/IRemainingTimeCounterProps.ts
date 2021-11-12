import { IAuctionDetails } from "../Auctions";
import { IDataComponentProps } from "../IDataComponentProps";

export interface IRemainingTimeCounterProps
  extends IDataComponentProps<
    Pick<
      IAuctionDetails,
      "timeStampDuration" | "timeStampEnd" | "timeStampStart"
    >
  > {}
