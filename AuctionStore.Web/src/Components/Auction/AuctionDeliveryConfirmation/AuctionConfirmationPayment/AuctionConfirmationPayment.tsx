import React from "react";
import { useFormContext } from "react-hook-form";
import { IBankAccount } from "../../../../Interfaces/user";
import { IDataComponentProps } from "../../../IDataComponentProps";
import dotpay from "../../../../Logos/dotpay.jpg";
import wallet from "../../../../Logos/wallet.png";
import { makeStyles ,Grid, Typography} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  photo: {
    height: "100px",
    width: "100px",
  },
});
const AuctionConfirmationPayment: React.FC<
  IDataComponentProps<IBankAccount | undefined>
> = ({ data }) => {
  const { getValues } = useFormContext();
  const { t } = useTranslation();
  const classes = useStyles();

  const generateWalletPay = (): JSX.Element => {
        return(
            <>
                <Grid item xs={12}>
                    <img alt='wallet' src={wallet} className={classes.photo}/>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            {data?.accountNr}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                        {data?.ownerFirstName} {data?.ownerLastName} 
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            {data?.ownerAddress}
                        </Typography>
                    </Grid>
                </Grid>
            </>
        )
  };

  if (!data) {
    return null;
  }
  return (
      <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h5'> {t('selectedPayment')}</Typography>
        </Grid>
        {
        getValues()["selectedPayment"] === 1 ? (
          <Grid item xs={12}>
            <img alt='dotpay' src={dotpay} className={classes.photo} />
          </Grid>
        ) : (
          generateWalletPay()
        )}
      </Grid>

  );
};

export default AuctionConfirmationPayment;
