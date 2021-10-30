import React, { useState, useEffect } from "react";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Edit } from "@material-ui/icons";
import { CircularProgress, Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { IAuctionInfo } from "../../../Interfaces/Auctions";
import { useToast } from "../../../shared/hooks/useToast";
import { AdminApi } from "../../../Services/Admin/AdminApi";
import StoreConfigPaper from "./StoreConfigPaper/StoreConfigPaper";
import Modal from "../../../shared/Modal/Modal";
import StoreConfigForm from "../../../Forms/StoreConfigForm";

const StoreConfig: React.FC = () => {
  const [auctionInfo, setAuctionInfo] = useState<IAuctionInfo>({
    maxPhotoSize: 2,
    maxPhotos: 5,
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [handleModal, setHandleModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setIsLoaded(true);
    AdminApi.GetAuctionInfo()
      .then((response) => {
        setAuctionInfo(response);
      })
      .catch(() => {
        toast(t("error"), "error");
      })
      .finally(() => {
        setIsLoaded(false);
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (): void => {
    setHandleModal(true);
  };
  const handleEdit = async (data: IAuctionInfo): Promise<void> => {
    AdminApi.UpsertAuctionInfo(data)
      .then(response => {
        setAuctionInfo(response);
        toast(t("success"), "success");
      })
      .catch(() => {
        toast(t("error"), "error");
      })
      .finally(() => {
        setHandleModal(false);

      })
  };

  if (isLoaded) {
    return <CircularProgress />;
  }

  return (
    <>
      <PaperNav
        header={t("auction_Config")}
        ExternalIcon={Edit}
        externalIconAction={handleOpenModal}
      />
      <Paper square>
        <StoreConfigPaper data={auctionInfo} />
      </Paper>
      <Modal
        header={t("edit_Store_Config")}
        isOpen={handleModal}
        handleClose={() => setHandleModal(false)}
        handleSave={(data: IAuctionInfo) => handleEdit(data)}
        initValue={auctionInfo}
      >
        <StoreConfigForm />
      </Modal>
    </>
  );
};

export default StoreConfig;
