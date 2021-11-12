import { IGenericTableColumnDefinitionProps } from "./";

export interface IGenericTableHeaderProps<T, K extends keyof T> {
    columns : Array<IGenericTableColumnDefinitionProps<T, K>>
}