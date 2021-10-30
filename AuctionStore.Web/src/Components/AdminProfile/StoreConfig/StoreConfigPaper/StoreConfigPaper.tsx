import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { IStoreConfigPaperProps } from "./IStoreConfigPaperProps";

const StoreConfigPaper: React.FC<IStoreConfigPaperProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={1}>
     <Grid item xs={12}>
          <Typography variant="h5">{t("maxPhotoSize")}: {data.maxPhotoSize} </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("maxPhotos")}: {data.maxPhotos }</Typography>
        </Grid>    
    </Grid>
  );
};

export default StoreConfigPaper;
