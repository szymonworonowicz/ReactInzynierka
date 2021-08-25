import React from 'react';
import {IPageRequest} from '../../../../Interfaces/Paged/IPageRequest';
import { IGenericTableColumnDefinitionType } from './IGenericTableColumnDefinition';

export interface IGenericTableProps <T, K extends keyof T>  {
    data : Array<T>;
    columns: Array<IGenericTableColumnDefinitionType<T,K>>;
    query : IPageRequest
    setQuery: React.Dispatch<React.SetStateAction<IPageRequest>>,
    countOfElements : number;
}