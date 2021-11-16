import { AddAuctionType, AuctionInfoType } from "../../Types/Auction";

export interface IAddAuctionProps {
    auctionInfo : AuctionInfoType;
    saveData : (data :AddAuctionType) => void
}