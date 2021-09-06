import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { Grid, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { IAddress } from "../Interfaces/user";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));
const AddressForm: React.FC = () => {
  const { register, getValues, setValue } = useFormContext();
  const [address, setAddress] = useState<IAddress>({
    city: getValues()["city"],
    houseNo: getValues()["houseNo"],
    id: getValues()["id"],
    postCode: getValues()["postCode"],
    street: getValues()["street"],
  });
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<{value : string, id : string}>) => {
    const { value, id } = e.target;
    setAddress((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(`${id}`, value);
  };

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input type="hidden" {...register("city", { required: true })} />
        <input type="hidden" {...register("houseNo", { required: true })} />
        <input type="hidden" {...register("id", { required: false })}/>
        <input type="hidden" {...register("postCode", { required: true })} />
        <input type="hidden" {...register("street", { required: true })} />
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
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
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
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
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
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
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
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
    </form>
  );
};

export default AddressForm;
