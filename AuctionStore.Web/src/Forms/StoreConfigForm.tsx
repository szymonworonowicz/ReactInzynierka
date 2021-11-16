import React, { useState } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {AuctionInfoType } from "../Types/Auction";
import {
  Grid,
  InputAdornment,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { getRegexTable, getValidator, ValidatorType } from "../Helpers/constans";

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

const StoreConfigForm: React.FC = () => {
  const { register, setValue, getValues, formState:{errors}} = useFormContext<AuctionInfoType>();
  const [payload, setPayload] = useState<AuctionInfoType>(getValues() as AuctionInfoType);

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setPayload((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as (keyof AuctionInfoType), Number(value));
  };

  const regexTable = getRegexTable(t);

  const formValidators  = {
    maxPhotoSize: getValidator(t, null, regexTable[ValidatorType.Decimal], true),
    maxPhotos: getValidator(t, null, regexTable[ValidatorType.Numbers], true),
  }

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input
          type="hidden"
          {...register("maxPhotoSize",formValidators.maxPhotoSize)}
        />
        <input type="hidden" {...register("maxPhotos",formValidators.maxPhotoSize)} />
        <Grid item xs={12}>
        <TextField
            id="maxPhotoSize"
            name="maxPhotoSize"
            autoFocus
            fullWidth
            value={payload.maxPhotoSize}
            onChange={handleChange}
            error={
              errors.maxPhotoSize && errors.maxPhotoSize.message !== undefined
            }
            helperText={(errors.maxPhotoSize as FieldError)?.message}
            label={t("maxPhotoSize")}
            InputProps ={{
              endAdornment : (
                <InputAdornment position="end">MB</InputAdornment>
              ) 
            }}
            className={clsx(classes.margin)}
          />
          
        </Grid>
        <Grid item xs={12}>
        <TextField
            id="maxPhotos"
            name="maxPhotos"
            autoFocus
            fullWidth
            value={payload.maxPhotos}
            onChange={handleChange}
            error={
              errors.maxPhotos && errors.maxPhotos.message !== undefined
            }
            helperText={(errors.maxPhotos as FieldError)?.message}
            label={t("maxPhotos")}
            className={clsx(classes.margin)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default StoreConfigForm;
