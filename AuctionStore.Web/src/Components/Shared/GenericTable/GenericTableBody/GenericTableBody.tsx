import React from "react";
import { IGenericTableBodyProps } from "../../../../Interfaces/Shared/GenericTable/";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  customTable: {
    padding: '8px'
  },
});

const GenericTableBody = <T, K extends keyof T>({
  data,
  columns,
}: IGenericTableBodyProps<T, K>): JSX.Element => {
  const classes = useStyles();
  return (
    <TableBody>
      {data.map((row, index) => {
        return (
          <TableRow key={`tableRow-${index}`}>
            {columns.map((column, index2) => {
              return (
                <TableCell key={`tableCell-${index}-${index2}`}  align='left' classes={{root: classes.customTable}} >
                  {
                    typeof column.generate === 'undefined' 
                    ?
                    (
                      typeof column.formatValue === 'undefined'
                      ?
                      (
                        row[column.key]
                      )
                      :
                      (
                        column.formatValue(row)
                      )
                    )
                    :
                    (
                      column.generate(row)
                    )
                  }

                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default GenericTableBody;
