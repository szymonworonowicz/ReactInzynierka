import React from "react";
import {IGenericTableFooterProps} from './IGenericTableFooterProps';
import { TableFooter, TableRow, TablePagination } from "@material-ui/core";    

const GenericTableFooter : React.FC<IGenericTableFooterProps>  = ({dataCount,rowsPerPage, page, handleChangePage, handleChangeRowsPerPage}) => {

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={dataCount}
                    rowsPerPage={rowsPerPage}
                    page = {page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter>
    )
}

export default GenericTableFooter;