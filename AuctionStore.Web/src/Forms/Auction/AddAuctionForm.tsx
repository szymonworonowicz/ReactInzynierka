import React, { useState, useContext } from "react";
import { IAddAuctionProps } from "./IAddAuctionFormProps";
import { useTranslation } from "react-i18next";
import { useFormContext, FieldError } from "react-hook-form";
import { Grid, TextField, Button } from "@material-ui/core";
import { AddAuctionType, AuctionPhotoType } from "../../Types/Auction";
import { makeStyles } from "@material-ui/core/styles";
import PictureUpload from "../../Components/Shared/PictureUpload/PictureUpload";
import AuctionTimePicker from "../../Components/AuctionAdd/AuctionTimePicker/AuctionTimePicker";
import AuctionAddCategoryPicker from "../../Components/AuctionAdd/AuctionAddCategoryPicker/AuctionAddCategoryPicker";
import { UserContext } from "../../Context/UserContext";
import {
  getRegexTable,
  getValidator,
  ValidatorType,
} from "../../Helpers/constans";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    marginTop: "10px",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

const AddAuctionForm: React.FC<IAddAuctionProps> = ({
  auctionInfo,
  saveData,
}) => {
  const [files, setFiles] = useState<Array<AuctionPhotoType>>([]);
  const context = useContext(UserContext);
  const [auction, setAuction] = useState<AddAuctionType>({
    title: "",
    photos: [],
    price: 0,
    isTimeAuction: true,
    description: "",
    userId: context.userId,
  });

  const classes = useStyles();
  const { t } = useTranslation();
  const regexTable = getRegexTable(t);

  const formValidators = {
    title: getValidator(t, null, regexTable[ValidatorType.AlphaNumeric], true),
    price: getValidator(t, null, regexTable[ValidatorType.Decimal], true),
    description: getValidator(
      t,
      null,
      regexTable[ValidatorType.AlphaNumeric],
      true
    ),
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AddAuctionType>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setAuction((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as (keyof AddAuctionType), value);
  };

  const handleSave = (data: AddAuctionType) => {
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

  const handlePriceBlur = (e: React.FocusEvent<{}>) => {
    const roundedPrice = Number(auction.price).toFixed(2);
    setAuction((prev) => {
      return {
        ...prev,
        price: Number(roundedPrice),
      };
    });
    setValue("price", Number(roundedPrice));
  };

  return (
    <form>
      <input type="hidden" {...register("title", formValidators.title)} />
      <input type="hidden" {...register("price", formValidators.price)} />
      <input
        type="hidden"
        {...register("description", formValidators.description)}
      />
      <input
        type="hidden"
        {...register("isTimeAuction", { required: false })}
      />
      <input
        type="hidden"
        {...register("timeStampStart", { required: true })}
      />
      <input type="hidden" {...register("timeStampEnd", { required: false })} />
      <input
        type="hidden"
        {...register("userId", { required: false, value: context.userId })}
      />

      <input
        type="hidden"
        {...register("timeStampDuration", { required: false })}
      />
      <input type="hidden" {...register("subCategoryId", { required: true })} />
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            autoFocus
            fullWidth
            value={auction.title}
            onChange={handleChange}
            error={errors.title && errors.title.message !== undefined}
            helperText={(errors.title as FieldError)?.message}
            label={t("auctionName")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="price"
            name="price"
            fullWidth
            value={auction.price}
            onChange={handleChange}
            error={errors.price && errors.price?.message !== undefined}
            helperText={(errors.price as FieldError)?.message}
            label={t("auctionPrice")}
            onBlur={handlePriceBlur}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <AuctionTimePicker
            auction={auction}
            setAuction={setAuction}
            margin={classes.margin}
          />
        </Grid>
        <Grid item xs={12}>
          <AuctionAddCategoryPicker setAuction={setAuction} auction={auction} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            label={t("auctionDescription")}
            multiline
            rows={4}
            fullWidth
            value={auction.description}
            onChange={handleChange}
            className={classes.margin}
          />
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
              {t("auctionAdd")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAuctionForm;
