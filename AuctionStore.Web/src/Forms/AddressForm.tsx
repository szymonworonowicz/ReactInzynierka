import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, FieldError } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { AddressType } from "../Types/User/user";
import {
  getRegexTable,
  getValidator,
  ValidatorType,
} from "../Helpers/constans";

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
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<AddressType>();
  const [address, setAddress] = useState<AddressType>({
    city: getValues()["city"],
    houseNo: getValues()["houseNo"],
    id: getValues()["id"],
    postCode: getValues()["postCode"],
    street: getValues()["street"],
  });
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<{ value: string; id: string }>
  ) => {
    const { value, id } = e.target;
    setAddress((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as keyof AddressType, value);
  };

  const regexTable = getRegexTable(t);

  const formValidators = {
    city: getValidator(t, null, regexTable[ValidatorType.Alphabetic], true),
    houseNo: getValidator(t, null, regexTable[ValidatorType.Alphabetic], true),
    postCode: getValidator(t, null, regexTable[ValidatorType.Alphabetic], true),
    street: getValidator(t, null, regexTable[ValidatorType.Alphabetic], true),
  };

  return (
    <form>
      <Grid container spacing={1} justify="center" alignContent="center">
        <input type="hidden" {...register("city", formValidators.city)} />
        <input type="hidden" {...register("houseNo",formValidators.houseNo)} />
        <input type="hidden" {...register("id", { required: false })} />
        <input type="hidden" {...register("postCode", formValidators.postCode)} />
        <input type="hidden" {...register("street", formValidators.street)} />
        <Grid item xs={12}>
          <TextField
            id="city"
            name="city"
            autoFocus
            fullWidth
            value={address.city}
            onChange={handleChange}
            error={errors.city && errors.city.message !== undefined}
            helperText={(errors.city as FieldError)?.message}
            label={t("city")}
            className={clsx(classes.margin)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="houseNo"
            name="houseNo"
            autoFocus
            fullWidth
            value={address.houseNo}
            onChange={handleChange}
            error={errors.houseNo && errors.houseNo.message !== undefined}
            helperText={(errors.houseNo as FieldError)?.message}
            label={t("houseNo")}
            className={clsx(classes.margin)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="postCode"
            name="postCode"
            autoFocus
            fullWidth
            value={address.postCode}
            onChange={handleChange}
            error={errors.postCode && errors.postCode.message !== undefined}
            helperText={(errors.postCode as FieldError)?.message}
            label={t("postCode")}
            className={clsx(classes.margin)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="street"
            name="street"
            autoFocus
            fullWidth
            value={address.street}
            onChange={handleChange}
            error={errors.street && errors.street.message !== undefined}
            helperText={(errors.street as FieldError)?.message}
            label={t("street")}
            className={clsx(classes.margin)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddressForm;
