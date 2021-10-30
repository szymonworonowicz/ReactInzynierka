import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AuctionApi } from "../../Services/Auction/Auction.service";
import { IAddAuction, IAuctionInfo } from "../../Interfaces/Auctions";
import { useToast } from "../../shared/hooks/useToast";
import AddAuctionForm from '../../Forms/Auction/AddAuctionForm';
import { useHistory } from "react-router-dom";

const AddAuction: React.FC = () => {
  const [auctionInfo, setAuctionInfo] = useState<IAuctionInfo>({
    maxPhotoSize: 2,
    maxPhotos: 5,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // const form 
  const methods = useForm();
  const toast = useToast();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
        AuctionApi.getAuctionInfo()
          .then(response => {
            if (response) {
              setAuctionInfo(response);
            }
          })
          .catch(() => {
            toast(t("error"), "error");
          })
          .finally(() => {
            setIsLoading(false);

          })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitAuction = (auction :IAddAuction) : void => {

    setIsLoading(true);
    AuctionApi.checkWrongWord(auction.description,auction.title)
      .then(() => {
        AuctionApi.addAuction(auction)
          .then(_resp => {
            toast(t('added_auction'),'success'); 
            setTimeout(() => {
              history.push('/');
            },3000);
          }).catch(_err => {
            toast(t('added_auction_failure'),'error'); 
          });
      })
      .catch(() => {
        toast(t('containsWrongWords'),'error')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <FormProvider {...methods}>
      <AddAuctionForm 
        saveData={handleSubmitAuction}
        auctionInfo={auctionInfo}
      />
    </FormProvider>
  );
};

export default AddAuction;
