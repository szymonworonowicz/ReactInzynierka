export interface IGenericTableColumnDefinitionType <T, K extends keyof T>  {
    key : K;
    header : string;
    width? : number;
    generate? : (dataRow : T) => JSX.Element;
    formatValue? : (dataRow: T) => any;
}