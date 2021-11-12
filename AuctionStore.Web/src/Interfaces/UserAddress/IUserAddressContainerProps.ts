import { IAddress } from "../user";
import  {IDataComponentProps} from '../IDataComponentProps'

export interface IUserAddressContainerProps extends IDataComponentProps<Array<IAddress>>  {
    onDeleteAddress : (id : string) => void;
    onEditAddress : (addressId : string) => void; 
}