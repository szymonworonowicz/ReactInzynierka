export interface IGenericTableColumnDefinitionType <T, K extends keyof T>  {
    key : K;
    header : string;
    width? : number;
}