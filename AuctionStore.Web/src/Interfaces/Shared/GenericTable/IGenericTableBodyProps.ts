import { IGenericTableColumnDefinitionProps } from "./IGenericTableColumnDefinitionProps";

export interface IGenericTableBodyProps<T, K extends keyof T> {
    data : Array<T>;
    columns : Array<IGenericTableColumnDefinitionProps<T, K>>
}