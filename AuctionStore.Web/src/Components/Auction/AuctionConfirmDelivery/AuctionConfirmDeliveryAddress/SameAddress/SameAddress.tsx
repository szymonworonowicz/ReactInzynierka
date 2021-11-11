import React, { useState } from "react";
import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import {
  IAuctionConfirmAddress,
  IAuctionConfirmationForm,
} from "../../../../../Interfaces/Auctions";


const useStyles = makeStyles({
  margin: {
    marginTop: "20px",
  },
});

const SameAddress: React.FC = () => {
  const { setValue, getValues } = useFormContext<IAuctionConfirmationForm>();
  const [sameDeliveryAddress, setSameDeliveryAddress] = useState<boolean>(
    getValues()["sameAddress"] ?? false
  );

  const { t } = useTranslation();
  const classes = useStyles();

  const [address, setAddress] = useState<IAuctionConfirmAddress>(
    getValues().address
  );

  const handleChangeDeliveryAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSameDeliveryAddress(e.target.checked);
    setValue("sameAddress", e.target.checked);
  };

  const handleChange = (
    e: React.ChangeEvent<{ value: string; id: string }>
  ) => {
    const { value, id } = e.target;
    setAddress((prev) => {
      return {
        ...prev,
        [`address.${id}`]: value,
      };
    });
    setValue(`address.{id}` as keyof IAuctionConfirmationForm, value);
  };


  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameDeliveryAddress}
                  onChange={handleChangeDeliveryAddress}
                />
              }
              label={t("sameDeliveryAddress")}
            />
          </FormGroup>
        </Grid>
        {!sameDeliveryAddress && (
          <Grid container spacing={1} className={classes.margin}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="city">{t("city")}</InputLabel>
                <Input
                  id="city"
                  autoFocus
                  fullWidth
                  value={address.city}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="houseNo">{t("houseNo")}</InputLabel>
                <Input
                  id="houseNo"
                  autoFocus
                  fullWidth
                  value={address.houseNo}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="postCode">{t("postCode")}</InputLabel>
                <Input
                  id="postCode"
                  autoFocus
                  fullWidth
                  value={address.postCode}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="street">{t("street")}</InputLabel>
                <Input
                  id="street"
                  autoFocus
                  fullWidth
                  value={address.street}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SameAddress;
