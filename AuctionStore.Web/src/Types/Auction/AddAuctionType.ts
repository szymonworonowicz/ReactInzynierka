import { AuctionPhotoType } from ".";

export type AddAuctionType = {
    title: string;
    photos: Array<AuctionPhotoType>;
    price: number;
    isTimeAuction: boolean;
    description: string;
    timeStampStart?:number;
    timeStampEnd? : number;
    timeStampDuration?: number;
    userId : string | null;
    subCategoryId? : string;
  };