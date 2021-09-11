import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { AuctionApi } from "../../Services/Auction/Auction.service";
import { IAuctionInfo } from "../../Interfaces/Auctions";
import { useToast } from "../../shared/hooks/useToast";
import PictureUpload from "../Shared/PictureUpload/PictureUpload";
import { IFileEntity } from "../Shared/PictureUpload/Interfaces";
import { IAddAuction } from "../../Interfaces/Auctions";

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


const AddAuction: React.FC = () => {
  const [auctionInfo, setAuctionInfo] = useState<IAuctionInfo>({
    maxPhotoSize: 2,
    maxPhotos: 5,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<IFileEntity>>([]);
  const [auction, setAuction] = useState<IAddAuction>({
    name: "",
    photos: [],
    price: 0,
    isTimeAuction: true,
    description: "",
  });

  // const form 
  const { register, setValue, getValues ,handleSubmit} = useForm();
  const classes = useStyles();
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        var response = await AuctionApi.getAuctionInfo();
        if (response) {
          setAuctionInfo(response);
        }
      } catch (error) {
        toast(t("error"), "error");
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleAuctionTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setAuction((prev) => {
      return {
        ...prev,
        isTimeAuction: value === "true",
      };
    });
    setValue("isTimeAuction", value === "true");
  };

  const handleSubmitAuction= async() : Promise<void> => {
    debugger;
    for(let file of files) {
      if(file.fileId) {
        auction.photos = [...auction.photos, file.fileId];
      }
    }
    
    const response = await AuctionApi.addAuction(auction);
  }

  return (
    <form>
      {/* <input type="hidden" {...register("name", { required: true })} />
      <input type="hidden" {...register("price", { required: true })} />
      <input type="hidden" {...register("isTimeAuction", { required: true })} />
      <input type="hidden" {...register("description", { required: true })} /> */}
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
          <FormControl
            className={clsx(classes.margin)}
            fullWidth
            component="fieldset"
          >
            <FormLabel component="legend">{t("auction_type")}</FormLabel>
            <RadioGroup
              value={auction.isTimeAuction}
              onChange={handleAuctionTypeChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={t("time_auction")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={t("quick_auction")}
              />
            </RadioGroup>
          </FormControl>
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
            <Button
              onClick={handleSubmitAuction}
            >
              {t('auction_add')}
              </Button>
            </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAuction;
