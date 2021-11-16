export type AuctionType = {
  id: string;
  title: string;
  price:number;
  description: string;
  timeStampStart : number | null;
  timeStampEnd : number | null;
  timeStampDuration : number | null;
  status: number;
}
