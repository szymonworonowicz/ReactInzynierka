import  {AuctionConfirmAddressType} from '.'

export type AuctionConfirmationFormType  = {
    auctionId : string;
    inpost : boolean;
    message : string;
    sameAddress : boolean;
    selectedAddressId:string;
    selectedPayment : number;
    address : AuctionConfirmAddressType
}
