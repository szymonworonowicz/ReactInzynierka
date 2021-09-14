import React, { useState } from "react";
import { IAddAuctionProps } from "./IAddAuctionFormProps";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { IAddAuction } from "../../Interfaces/Auctions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useToast } from "../../shared/hooks/useToast";
import PictureUpload from "../../Components/Shared/PictureUpload/PictureUpload";
import { IFileEntity } from "../../Components/Shared/PictureUpload/Interfaces";
import AuctionTimePicker from '../../Components/AuctionAdd/AuctionTimePicker/AuctionTimePicker';

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

const AddAuctionForm: React.FC<IAddAuctionProps> = ({
  auctionInfo,
  saveData,
}) => {
  const [files, setFiles] = useState<Array<IFileEntity>>([]);
  const [auction, setAuction] = useState<IAddAuction>({
    name: "",
    photos: [],
    price: 0,
    isTimeAuction: true,
    description: "",
  });

  const classes = useStyles();
  const { t } = useTranslation();
  const toast = useToast();

  const { register, setValue, handleSubmit } = useFormContext();

  const handleChange = (e: any) => {
    const { value, id } = e.target;
    setAuction((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(`${id}`, value);
  };


  const handleSave = async (data: IAddAuction) => {
    debugger;
    for (let file of files) {
      if (file.fileId) {
        data.photos = [...data.photos, file.fileId];
      }
    }

    await saveData(data);
  };

  return (
    <form>
      <input type="hidden" {...register("name", { required: true })} />
      <input type="hidden" {...register("price", { required: true })} />
      <input type="hidden" {...register("isTimeAuction", { required: false })} />
      <input type="hidden" {...register("description", { required: true })} />
      <input type="hidden" {...register("timeStampStart", { required: true })} />
      <input type="hidden" {...register("timeStampEnd", { required: false })} />
      <input type="hidden" {...register("timeStampDuration", { required: false })} />
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="name">{t("auction_name")}</InputLabel>
            <Input
              id="name"
              autoFocus
              fullWidth
              value={auction.name}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="price">{t("auction_price")}</InputLabel>
            <Input
              id="price"
              autoFocus
              fullWidth
              value={auction.price}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
            <AuctionTimePicker 
                auction={auction}
                setAuction = {setAuction}
                margin={classes.margin}
            />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <TextField
              id="description"
              label={t("auction_desctiption")}
              multiline
              rows={4}
              fullWidth
              value={auction.description}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <PictureUpload
            setFileEntity={setFiles}
            storeFileConfig={auctionInfo}
            fileEntity={files}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button onClick={handleSubmit(handleSave)}>
              {t("auction_add")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAuctionForm;
