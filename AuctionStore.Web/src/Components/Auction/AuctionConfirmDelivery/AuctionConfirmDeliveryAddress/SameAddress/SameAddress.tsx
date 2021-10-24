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
import { IAddress } from "../../../../../Interfaces/user";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    margin: {
        marginTop:'20px'
    }
})

const SameAddress: React.FC = () => {
  const [sameDeliveryAddress, setSameDeliveryAddress] =
    useState<boolean>(false);

  const { setValue, getValues, register } = useFormContext();
  const { t } = useTranslation();
  const classes = useStyles();

  const [address, setAddress] = useState<IAddress>({
    city: getValues()["address.city"],
    houseNo: getValues()["address.houseNo"],
    id: "",
    postCode: getValues()["address.postCode"],
    street: getValues()["address.street"],
  });

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
    setValue(`address.${id}`, value);
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
            {/* <input type="hidden" {...register("city", { required: true })} />
            <input type="hidden" {...register("houseNo", { required: true })} />
            <input
              type="hidden"
              {...register("postCode", { required: true })}
            />
            <input type="hidden" {...register("street", { required: true })} /> */}

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
