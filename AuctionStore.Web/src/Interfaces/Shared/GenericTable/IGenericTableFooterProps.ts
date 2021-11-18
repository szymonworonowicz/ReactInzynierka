export interface IGenericTableFooterProps {
    dataCount :number;
    rowsPerPage : number;
    page:number;
    handleChangePage : (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    handleChangeRowsPerPage : (event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}