import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuctionApi } from "../../Services/Auction/Auction.service";
import { AddAuctionType,AuctionInfoType } from "../../Types/Auction";
import { useToast } from "../../shared/hooks/useToast";
import AddAuctionForm from '../../Forms/Auction/AddAuctionForm';
import { useHistory } from "react-router-dom";
import { LottieContext } from "../../Context/LottieContext";

const AddAuction: React.FC = () => {
  const [auctionInfo, setAuctionInfo] = useState<AuctionInfoType>({
    maxPhotoSize: 2,
    maxPhotos: 5,
  });
  const {isOpen, setLottieOpen} = React.useContext(LottieContext);  
  // const form 
  const methods = useForm();
  const toast = useToast();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setLottieOpen(true);
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
            setLottieOpen(false);

          })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitAuction = (auction :AddAuctionType) : void => {

    setLottieOpen(true);
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
        setLottieOpen(false);
      })
  }

  if (isOpen) {
    return <></>;
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
