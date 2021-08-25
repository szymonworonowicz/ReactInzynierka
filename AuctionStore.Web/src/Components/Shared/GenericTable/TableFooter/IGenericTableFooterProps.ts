export interface IGenericTableFooterProps {
    dataCount :number;
    rowsPerPage : number;
    page:number;
    handleChangePage : (e: any, newPage : any) => void;
    handleChangeRowsPerPage : (e : any) => void;
}