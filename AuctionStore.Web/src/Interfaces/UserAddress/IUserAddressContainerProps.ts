import { AddressType } from "../../Types/User/user";
import  {IDataComponentProps} from '../IDataComponentProps'

export interface IUserAddressContainerProps extends IDataComponentProps<Array<AddressType>>  {
    onDeleteAddress : (id : string) => void;
    onEditAddress : (addressId : string) => void; 
}