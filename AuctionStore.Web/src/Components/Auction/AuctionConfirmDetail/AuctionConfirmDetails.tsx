import React, { useEffect,  useState } from "react";
import { IAuctionConfirmDetailsProps } from "../../../Interfaces/Auction/AuctionConfirmation";
import { AuctionApi } from "../../../Services/Auction/Auction.service";

import {
  Paper,
  Typography,
  Grid,
  FormControl,
  TextField,
} from "@material-ui/core";
import { IAuctionDetails } from "../../../Interfaces/Auctions";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { LottieContext } from "../../../Context/LottieContext";

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  root: {
    padding: "10px",
  },
  margin : {
      marginTop:'10px'
  }
});

const AuctionConfirmDetails: React.FC<IAuctionConfirmDetailsProps> = ({
  id,
  setConfirmation,
  confirmation,
}) => {
  const [auction, setAuction] = useState<IAuctionDetails>();
  const {isOpen, setLottieOpen} = React.useContext(LottieContext);

  const classes = useStyles();
  const { t } = useTranslation();

  const {setValue} = useFormContext();

  
  useEffect(() => {
    setLottieOpen(true);
    AuctionApi.getAuction(id)
    .then(response => {
      setAuction(response);
    })
    .finally(() => {
      setLottieOpen(false);
    })

  }, [id, setLottieOpen]);

  const handleMessageChange = (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;

    setConfirmation((prev) => {
      return {
        ...prev,
        message: value,
      };
    });
    setValue('message', value);
  };

  if (isOpen) {
    return <></>
  }

  return (
    <>
      <div>
        <Paper>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            className={classes.root}
          >
            <Grid item xs={7}>
              <Typography variant="h5">{t('auctionName')}:  {auction?.title ?? ""}</Typography>
            </Grid>
            <Grid item xs={3}>
              <div> {t('auctionprice')}: {auction?.maxOffer ?? ""}</div>
            </Grid>
            <Grid item xs={12} className={classes.margin}>
              <Typography variant="h5">{t("messageToAuthor")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="description"
                  label={t("messageToAuthor")}
                  multiline
                  variant="outlined"
                  fullWidth
                  value={confirmation.message}
                  onChange={handleMessageChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default AuctionConfirmDetails;
