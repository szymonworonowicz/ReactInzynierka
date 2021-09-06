import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import { IAddress } from "../../../Interfaces/user";
import { useToast } from "../../../shared/hooks/useToast";
import { UserApi } from "../../../Services/User/UserApi";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Add } from "@material-ui/icons";
import UserAddressesContainer from "./UserAddressesContainer/UserAddressesContainer";
import Popper from "../../../shared/Popper/Popper";
import Modal from "../../../shared/Modal/Modal";
import AddressForm from '../../../Forms/AddressForm';

const UserAddresses: React.FC = () => {
  const [addressTable, setAddressTable] = useState<Array<IAddress>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [isDeleteAddress, setIsDeleteAddress] = useState<boolean>(false);
  const [actionAddressId, setActionAddressId] = useState<string>("");
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
  };

  const handleAgreeDeleteAddress = async (): Promise<void> => {
    const response = await UserApi.deleteAddress(actionAddressId);

    if (response) {
      toast(`${t("successDeleteAddress")}`, "success");
      const index = addressTable.findIndex((x) => x.id === actionAddressId);
      if (index !== -1) {
        setAddressTable((prev) => {
          let local = prev;
          local.splice(index, 1);
          return [...local];
        });
      }
      setIsDeleteAddress(false);
    } else {
      toast(`${t("failureDeleteAddress")}`, "error");
    }
  };

  const handleDeleteAdress = (id: string) => {
    setActionAddressId(id);
    setIsDeleteAddress(true);
  };

  const handleEditAddress = (addressId: string): void => {
    setActionAddressId(addressId);
    setAddModal(true);
  };

  const handleUpsertAddress = async (data: IAddress): Promise<void> => {
      const response = await UserApi.UpsertAddress(data, context.userId);
      if(response) {
        toast(data.id ? t('success_add'): t('success_update'), 'success');
        if(!data.id) {
          setAddressTable(prev => [...prev, response]);
        }
        else {
          const index = addressTable.findIndex(x => x.id === response.id);
          if(index !== -1) {
            const local = addressTable;
            local.splice(index,1, response);
            setAddressTable([...local]);
          }
        }
      }
      else {
        toast(data.id ? t('failure_add'): t('failure_update'), 'error');
      }

      setAddModal(false);
  };

  const getInitAddress = () : IAddress | undefined => {
    const index = addressTable.findIndex(x => x.id === actionAddressId);
    if(index === -1) {
      return undefined;
    }
    return addressTable[index];
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
      <UserAddressesContainer
        data={addressTable}
        onDeleteAddress={handleDeleteAdress}
        onEditAddress={handleEditAddress}
      />

      <Popper
        body={t("deleteAddressConfirm")}
        title={t("deleteAddress")}
        open={isDeleteAddress}
        onCancel={handleCancelDeleteAddress}
        onAgree={handleAgreeDeleteAddress}
      />
      {addModal && (
        <Modal
          header={actionAddressId === "" ? t("add_address") : t("edit_address")}
          isOpen={addModal}
          handleClose={() => setAddModal(false)}
          handleSave={(data: IAddress) => handleUpsertAddress(data)}
          initValue={getInitAddress()}
        >
          <AddressForm/>
        </Modal>
      )}
    </>
  );
};

export default UserAddresses;
