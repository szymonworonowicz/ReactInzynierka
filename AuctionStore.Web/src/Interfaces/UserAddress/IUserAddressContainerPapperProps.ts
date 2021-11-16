import { AddressType } from "../../Types/User/user";

export interface IUserAddressContainerPapperProps{
    address : AddressType;
    onDeleteAddress: (id:string) => void;
    onEditAddress: (addressId : string) => void;
}