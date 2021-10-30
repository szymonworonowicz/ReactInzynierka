import React, { useState, useContext } from "react";
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
import { IAddAuction, IAuctionPhoto } from "../../Interfaces/Auctions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PictureUpload from "../../Components/Shared/PictureUpload/PictureUpload";
import AuctionTimePicker from "../../Components/AuctionAdd/AuctionTimePicker/AuctionTimePicker";
import AuctionAddCategoryPicker from "../../Components/AuctionAdd/AuctionAddCategoryPicker/AuctionAddCategoryPicker";
import { UserContext } from "../../Context/UserContext";

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
  const [files, setFiles] = useState<Array<IAuctionPhoto>>([]);
  const context = useContext(UserContext);
  const [auction, setAuction] = useState<IAddAuction>({
    title: "",
    photos: [],
    price: 0,
    isTimeAuction: true,
    description: "",
    userId: context.userId,
  });

  const classes = useStyles();
  const { t } = useTranslation();

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

  const handleSave = (data: IAddAuction) => {
    data.isTimeAuction = auction.isTimeAuction;
    if (!data.photos) {
      data.photos = [];
    }
    for (let file of files) {
      if (file.photoId) {
        data.photos = [...data.photos, file];
      }
    }
    saveData(data);
  };

  return (
    <form>
      <input type="hidden" {...register("title", { required: true })} />
      <input type="hidden" {...register("price", { required: true })} />
      <input
        type="hidden"
        {...register("isTimeAuction", { required: false })}
      />
      <input type="hidden" {...register("description", { required: true })} />
      <input
        type="hidden"
        {...register("timeStampStart", { required: true })}
      />
      <input type="hidden" {...register("timeStampEnd", { required: false })} />
      <input type="hidden" {...register("userId", { required: false ,value:context.userId})} />

      <input
        type="hidden"
        {...register("timeStampDuration", { required: false })}
      />
      <input type="hidden" {...register("subCategoryId", { required: true })} />
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="title">{t("auction_name")}</InputLabel>
            <Input
              id="title"
              autoFocus
              fullWidth
              value={auction.title}
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
            setAuction={setAuction}
            margin={classes.margin}
          />
        </Grid>
        <Grid item xs={12}>
          <AuctionAddCategoryPicker  setAuction={setAuction} auction={auction}/>
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
