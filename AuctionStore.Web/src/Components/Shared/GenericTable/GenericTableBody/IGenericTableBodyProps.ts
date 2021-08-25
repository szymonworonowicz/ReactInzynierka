import { IGenericTableColumnDefinitionType } from "../GenericTableInterface/IGenericTableColumnDefinition";

export interface IGenericTableBodyProps<T, K extends keyof T> {
    data : Array<T>;
    columns : Array<IGenericTableColumnDefinitionType<T, K>>
}