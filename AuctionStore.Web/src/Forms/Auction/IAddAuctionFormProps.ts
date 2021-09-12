import { IAddAuction, IAuctionInfo } from "../../Interfaces/Auctions";

export interface IAddAuctionProps {
    auctionInfo : IAuctionInfo;
    saveData : (data :IAddAuction) => Promise<void>
}