import React from 'react';
import { IAddress } from "../../../../../Interfaces/user";
import { IDataComponentProps } from "../../../../IDataComponentProps";

export interface IAddressContainerProps extends IDataComponentProps<IAddress> {
    setEditAddress : React.Dispatch<React.SetStateAction<boolean>>
}
