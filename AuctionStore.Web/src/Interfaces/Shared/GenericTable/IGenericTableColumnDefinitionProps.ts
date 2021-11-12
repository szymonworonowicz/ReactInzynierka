export interface IGenericTableColumnDefinitionProps <T, K extends keyof T>  {
    key : K;
    header : string;
    width? : number;
    generate? : (dataRow : T) => JSX.Element;
    formatValue? : (dataRow: T) => any;
}