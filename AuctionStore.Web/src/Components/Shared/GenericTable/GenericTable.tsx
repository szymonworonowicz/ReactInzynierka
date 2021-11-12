import React from "react";
import { IGenericTableProps,IGenericTableFooterProps } from "../../../Interfaces/Shared/GenericTable";
import { TableContainer, Table, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GenericTableHeader from "./GenericTableHeader/GenericTableHeader";
import GenericTableBody from "./GenericTableBody/GenericTableBody";
import TableFooter from "./TableFooter/GenericTableFooter";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const GenericTable = <T, K extends keyof T>({
  data,
  columns,
  query,
  setQuery,
  countOfElements,
  externalMethod,
}: IGenericTableProps<T, K>): JSX.Element => {
  const classes = useStyles();

  const handleNewPage = (e: any, newPage: any) => {
    if (typeof externalMethod === "function") {
      externalMethod();
    }
    setQuery((prev) => {
      return {
        ...prev,
        page: parseInt(newPage),
      };
    });
  };

  const handleChangeRowsPerPage = (e: any) => {
    if (typeof externalMethod === "function") {
      externalMethod();
    }
    setQuery({
      elemPerPage: parseInt(e.target.value),
      page: 0,
    });
  };

  const generateTableFooterProps = (): IGenericTableFooterProps => {
    return {
      handleChangePage: handleNewPage,
      handleChangeRowsPerPage: handleChangeRowsPerPage,
      page: query.page,
      rowsPerPage: query.elemPerPage,
      dataCount: countOfElements,
    };
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="table">
        <GenericTableHeader columns={columns} />
        <GenericTableBody columns={columns} data={data} />
        <TableFooter {...generateTableFooterProps()} />
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
