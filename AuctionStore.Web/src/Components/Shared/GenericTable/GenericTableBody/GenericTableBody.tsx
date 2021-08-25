import React from "react";
import { IGenericTableBodyProps } from "./IGenericTableBodyProps";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

const GenericTableBody = <T, K extends keyof T>({
  data,
  columns,
}: IGenericTableBodyProps<T, K>): JSX.Element => {
  return (
    <TableBody>
      {data.map((row, index) => {
        return (
          <TableRow key={`tableRow-${index}`}>
            {columns.map((column, index2) => {
              return (
                <TableCell key={`tableCell-${index}-${index2}`}>
                  {row[column.key]}
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
