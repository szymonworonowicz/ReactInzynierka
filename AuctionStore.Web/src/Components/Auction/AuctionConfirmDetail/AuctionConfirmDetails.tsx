import React, { useEffect, useCallback, useState } from "react";
import { IAuctionConfirmDetailsProps } from "./IAuctionConfirmDetailsProps";
import { AuctionApi } from "../../../Services/Auction/Auction.service";

import {
  Paper,
  Typography,
  Grid,
  FormControl,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { IAuctionDetails } from "../../../Interfaces/Auctions";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const classes = useStyles();
  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    const response = await AuctionApi.getAuction(id);
    setAuction(response);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    (async () => {
      fetchData();
    })();
  }, [fetchData]);

  const handleMessageChange = (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;

    setConfirmation((prev) => {
      return {
        ...prev,
        message: value,
      };
    });
  };

  if (!isLoaded) {
    return <CircularProgress />;
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
                  label={t("MessageToAuthor")}
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