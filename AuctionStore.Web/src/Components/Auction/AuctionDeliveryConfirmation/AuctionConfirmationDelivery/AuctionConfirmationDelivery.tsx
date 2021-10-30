import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import inpost from "../../../../Logos/inpost.png";
import dpd from "../../../../Logos/dpd.jpg";

const useStyles = makeStyles({
  photo: {
    height: "100px",
    width: "100px",
  },
});
const AuctionConfirmationDelivery: React.FC = () => {
  const { getValues } = useFormContext();
  const { t } = useTranslation();

  const classes = useStyles();

  const getDpdAddress = () : JSX.Element => {
      const address = getValues()['address'];

      return (
          <>
            {
                getValues()['sameAddress'] ? (
                   <Typography variant='h6'>{t('sameAddressAsInvoice')}</Typography>
                ): (
                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <Typography variant='h6'>{address['street']} {address['houseNo']}</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant='h6'>{address['postCode']} {address['city']}</Typography>
                        </Grid>
                    </Grid>
                )
            }
        </>
      )
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">{t("delivery")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6"> {t("selectedDelivery")}</Typography>
        </Grid>
        <Grid item xs={12}>
          {!Boolean(getValues()["inpost"]) ? (
            <img src={dpd} alt="dpd" className={classes.photo} />
          ) : (
            <img src={inpost} alt="inpost" className={classes.photo} />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6"> {t("deliveryAddress")}</Typography>
        </Grid>
        <Grid item xs={12}>
          {Boolean(getValues()["inpost"]) ? (
              <Typography variant="h6">{getValues()["parcelAddress"]['line1']} {getValues()["parcelAddress"]['line2']}</Typography>
          ) : (
                getDpdAddress()
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AuctionConfirmationDelivery;
