import { IAddress } from "../../../../Interfaces/user";

export interface IUserAddressContainerProps {
    data : Array<IAddress>;
    onDeleteAddress : (id : string) => void;
    onEditAddress : (addressId : string) => void; 
}