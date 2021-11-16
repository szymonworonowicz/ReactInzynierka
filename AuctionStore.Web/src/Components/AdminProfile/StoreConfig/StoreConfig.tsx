import React, { useState, useEffect } from "react";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Edit } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AuctionInfoType } from "../../../Types/Auction/";
import { useToast } from "../../../shared/hooks/useToast";
import { AdminApi } from "../../../Services/Admin/Admin.service";
import StoreConfigPaper from "./StoreConfigPaper/StoreConfigPaper";
import Modal from "../../../shared/Modal/Modal";
import StoreConfigForm from "../../../Forms/StoreConfigForm";
import { makeStyles } from "@material-ui/styles";
import { LottieContext } from "../../../Context/LottieContext";

const useStyles = makeStyles({
  content:{

  }
})

const StoreConfig: React.FC = () => {
  const [auctionInfo, setAuctionInfo] = useState<AuctionInfoType>({
    maxPhotoSize: 2,
    maxPhotos: 5,
  });
  const {isOpen, setLottieOpen} = React.useContext(LottieContext);
  const [handleModal, setHandleModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();
  const classes = useStyles();

  useEffect(() => {
    setLottieOpen(true);
    AdminApi.GetAuctionInfo()
      .then((response) => {
        setAuctionInfo(response);
      })
      .catch(() => {
        toast(t("error"), "error");
      })
      .finally(() => {
        setLottieOpen(false);
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (): void => {
    setHandleModal(true);
  };
  const handleEdit = async (data: AuctionInfoType): Promise<void> => {
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

  if (isOpen) {
    return <></>
  }

  return (
    <>
      <PaperNav
        header={t("auctionConfig")}
        ExternalIcon={Edit}
        externalIconAction={handleOpenModal}
      />
      <Paper square className={classes.content}>
        <StoreConfigPaper data={auctionInfo} />
      </Paper>
      <Modal
        header={t("editStoreConfig")}
        isOpen={handleModal}
        handleClose={() => setHandleModal(false)}
        handleSave={(data: AuctionInfoType) => handleEdit(data)}
        initValue={auctionInfo}
      >
        <StoreConfigForm />
      </Modal>
    </>
  );
};

export default StoreConfig;
