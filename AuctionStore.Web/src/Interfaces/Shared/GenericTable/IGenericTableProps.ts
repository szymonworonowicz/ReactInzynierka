import React from 'react';
import {PageRequestType} from '../../../Types/Paged/';
import { IGenericTableColumnDefinitionProps } from './IGenericTableColumnDefinitionProps';

export interface IGenericTableProps <T, K extends keyof T>  {
    data : Array<T>;
    columns: Array<IGenericTableColumnDefinitionProps<T,K>>;
    query : PageRequestType
    setQuery: React.Dispatch<React.SetStateAction<PageRequestType>>,
    countOfElements : number;
    externalMethod?: () => void ;
}