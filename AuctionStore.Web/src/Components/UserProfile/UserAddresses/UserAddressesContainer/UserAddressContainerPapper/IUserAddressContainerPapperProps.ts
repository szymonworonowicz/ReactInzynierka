import { IAddress } from "../../../../../Interfaces/user";

export interface IUserAddressContainerPapperProps{
    address : IAddress;
    onDeleteAddress: (id:string) => void;
}