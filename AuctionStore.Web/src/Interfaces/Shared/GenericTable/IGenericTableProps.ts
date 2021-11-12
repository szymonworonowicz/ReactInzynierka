import React from 'react';
import {IPageRequest} from '../../Paged/IPageRequest';
import { IGenericTableColumnDefinitionProps } from './IGenericTableColumnDefinitionProps';

export interface IGenericTableProps <T, K extends keyof T>  {
    data : Array<T>;
    columns: Array<IGenericTableColumnDefinitionProps<T,K>>;
    query : IPageRequest
    setQuery: React.Dispatch<React.SetStateAction<IPageRequest>>,
    countOfElements : number;
    externalMethod?: () => void ;
}