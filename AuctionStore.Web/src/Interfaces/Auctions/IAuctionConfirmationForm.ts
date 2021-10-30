import  {IAuctionConfirmAddress} from './'

export type IAuctionConfirmationForm  = {
    auctionId : string;
    inpost : boolean;
    message : string;
    sameAddress : boolean;
    selectedAddressId:string;
    selectedPayment : number;
    address : IAuctionConfirmAddress
}
