import {IAuctionDetails} from '../../../../../Interfaces/Auctions'

export interface IRemainingTimeCounterProps {
    data : Pick<IAuctionDetails,"timeStampDuration" | "timeStampEnd" | "timeStampStart">
}