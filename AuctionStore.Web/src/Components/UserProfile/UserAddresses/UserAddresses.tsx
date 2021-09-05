import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import { useTranslation } from "react-i18next";
import { CircularProgress} from "@material-ui/core";
import { IAddress } from "../../../Interfaces/user";
import { useToast } from "../../../shared/hooks/useToast";
import { UserApi } from "../../../Services/User/UserApi";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Add } from "@material-ui/icons";
import UserAddressesContainer from "./UserAddressesContainer/UserAddressesContainer";
import Popper from '../../../shared/Popper/Popper'

const UserAddresses: React.FC = () => {
  const [addressTable, setAddressTable] = useState<Array<IAddress>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [isDeleteAddress, setIsDeleteAddress] = useState<boolean>(false);
  const [deleteAddressId, setDeleteAddressId] = useState<string>('');
  const context = useContext(UserContext);

  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setIsLoaded(true);
    (async () => {
      const data = await UserApi.getAddresses(context.userId);
      setAddressTable(data);
      setIsLoaded(false);
    })();
  }, [setIsLoaded, context.userId]);

  const handleCancelDeleteAddress = () => {
      setIsDeleteAddress(false);
  }

  const handleAgreeDeleteAddress = async() : Promise<void> => {
    const response = await UserApi.deleteAddress(deleteAddressId);

    if(response) {
        toast(`${t('successDeleteAddress')}`, "success");
        const index = addressTable.findIndex(x => x.id === deleteAddressId);
        if(index !== -1) {
            setAddressTable(prev => {
                let local = prev;
                local.splice(index, 1);
                return [...local];
            })
        }
        setIsDeleteAddress(false);
    }
    else {
        toast(`${t('failureDeleteAddress')}`, 'error');
    }
  }

  const handleDeleteAdress = (id : string) => {
    setDeleteAddressId(id);
    setIsDeleteAddress(true);
  }

  if (isLoaded) {
    return <CircularProgress />;
  }

  return (
    <>
      <PaperNav
        header={t("Addresses")}
        ExternalIcon={Add}
        externalIconAction={() => setAddModal(true)}
      />
      <UserAddressesContainer  data={addressTable} onDeleteAddress={handleDeleteAdress}/>

      <Popper
        body={t("deleteAddressConfirm")}
        title={t("deleteAddress")}
        open={isDeleteAddress}
        onCancel={handleCancelDeleteAddress}
        onAgree={handleAgreeDeleteAddress}
      />
    </>
  );
};

export default UserAddresses;
