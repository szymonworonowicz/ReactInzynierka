import { AddressType } from "../../Types/User/";

export interface IUserAddressContainerPapperProps{
    address : AddressType;
    onDeleteAddress: (id:string) => void;
    onEditAddress: (addressId : string) => void;
}