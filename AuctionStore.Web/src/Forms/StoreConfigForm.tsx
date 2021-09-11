import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IAuctionInfo } from "../Interfaces/Auctions";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
  const { register, setValue, getValues } = useFormContext();
  const [payload, setPayload] = useState<IAuctionInfo>({
    maxPhotoSize: getValues()["maxPhotoSize"],
    maxPhotos: getValues()["maxPhotos"],
  });

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<{ value: string; id: string }>
  ) => {
    const { value, id } = e.target;
    setPayload((prev) => {
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
        <input
          type="hidden"
          {...register("maxPhotoSize", { required: true })}
        />
        <input type="hidden" {...register("maxPhotos", { required: true })} />
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="maxPhotoSize">{t("maxPhotoSize")}</InputLabel>
            <Input
              id="maxPhotoSize"
              autoFocus
              fullWidth
              value={payload.maxPhotoSize}
              onChange={handleChange}
              endAdornment={<InputAdornment position="end">MB</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="maxPhotos">{t("maxPhotos")}</InputLabel>
            <Input
              id="maxPhotos"
              autoFocus
              fullWidth
              value={payload.maxPhotos}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default StoreConfigForm;
