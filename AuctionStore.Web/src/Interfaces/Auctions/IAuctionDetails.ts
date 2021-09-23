export interface IAuctionDetails {
    id: string;
    title: string;
    price:number;
    description: string;
    timeStampStart : number | null;
    timeStampEnd : number | null;
    timeStampDuration : number | null;
    maxOffer : number;
    userId : string;
}