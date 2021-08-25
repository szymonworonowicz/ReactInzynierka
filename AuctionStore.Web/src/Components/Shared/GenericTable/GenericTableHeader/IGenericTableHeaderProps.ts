import { IGenericTableColumnDefinitionType } from "../GenericTableInterface/IGenericTableColumnDefinition";

export interface IGenericTableHeaderProps<T, K extends keyof T> {
    columns : Array<IGenericTableColumnDefinitionType<T, K>>
}