export interface IAddAuction  {
    name: string;
    photos: Array<string>;
    price: number;
    isTimeAuction: boolean;
    description: string;
    timeStampStart?:number;
    timeStampEnd? : number;
    timeStampDuration?: number;
  };