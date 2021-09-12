import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AuctionApi } from "../../Services/Auction/Auction.service";
import { IAddAuction, IAuctionInfo } from "../../Interfaces/Auctions";
import { useToast } from "../../shared/hooks/useToast";
import AddAuctionForm from '../../Forms/Auction/AddAuctionForm';

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

  const handleSubmitAuction = async(auction :IAddAuction) : Promise<void> => {
    const response = await AuctionApi.addAuction(auction);
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
