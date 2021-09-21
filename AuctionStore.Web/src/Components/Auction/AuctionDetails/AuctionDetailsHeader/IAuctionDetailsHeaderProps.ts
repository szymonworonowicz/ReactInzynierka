import {IAuctionDetails} from '../../../../Interfaces/Auctions'

export interface IAuctionDetailsHeaderProps {
    data : Omit<IAuctionDetails,"description">
}