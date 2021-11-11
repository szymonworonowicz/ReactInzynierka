import React from "react";
import { IDataComponentProps } from "../../../IDataComponentProps";
import { IBankAccount } from "../../../../Interfaces/user";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  root: {
    // padding:'4vw 10% 5%',
    padding: "20px",
  },
  content: {},
}));

const BankAccountPaper: React.FC<IDataComponentProps<IBankAccount | null>> = ({
  data,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <Typography variant="h5">
              {t("accountNr")}: {data?.accountNr}
            </Typography>
            <Typography variant="h5">
              {t("firstName")}: {data?.ownerFirstName}
            </Typography>
            <Typography variant="h5">
              {t("lastName")}: {data?.ownerLastName}
            </Typography>
            <Typography variant="h5">
              {t("address")}: {data?.ownerAddress}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BankAccountPaper;
