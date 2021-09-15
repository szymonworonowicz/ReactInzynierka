import { IAuctionPhoto } from ".";

export interface IAddAuction  {
    title: string;
    photos: Array<IAuctionPhoto>;
    price: number;
    isTimeAuction: boolean;
    description: string;
    timeStampStart?:number;
    timeStampEnd? : number;
    timeStampDuration?: number;
    userId : string | null;
  };