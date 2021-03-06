import React from "react";
import { IGenericTableHeaderProps } from "../../../../Interfaces/Shared/GenericTable"
import {TableHead, TableRow, TableCell} from '@material-ui/core';


const  GenericTableHeader = <T, K extends keyof T>({columns} : IGenericTableHeaderProps<T, K>) : JSX.Element => {
    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((elem, index) => {
                        return (
                            <TableCell align='left' key={`headerRow-${index}`}> 
                                {elem.header}
                            </TableCell>
                        )
                    })
                }
            </TableRow>    
        </TableHead>
    )
}

export default GenericTableHeader;