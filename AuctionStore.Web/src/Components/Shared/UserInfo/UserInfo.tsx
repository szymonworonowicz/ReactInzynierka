import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  IUserDto,
  IChangePassword,
  IBankAccount,
} from "../../../Interfaces/user";
import { UserApi } from "../../../Services/User/UserApi";
import { UserContext } from "../../../Context/UserContext";
import { CircularProgress, Paper } from "@material-ui/core";
import PaperNav from "../PaperNav/PaperNav";
import UserInfoPaper from "./UserInfoPaper/UserInfoPaper";
import BankAccountPaper from "./BankAccountPaper/BankAccountPaper";
import { Lock } from "@material-ui/icons";
import Modal from "../../../shared/Modal/Modal";
import Popper from "../../../shared/Popper/Popper";
import ChangePasswordForm from "../../../Forms/Auth/ChangePasswordForm";
import { useToast } from "../../../shared/hooks/useToast";
import ChangeBankAccountForm from "../../../Forms/Auth/ChangeBankAccountForm";
import ChangeUserDataForm from "../../../Forms/Auth/ChangeUserDataForm";

const UserInfo: React.FC = () => {
  const context = useContext(UserContext);
  const [userData, setUserData] = useState<IUserDto | null>(null);
  const [bankAccount, setBankAccount] = useState<IBankAccount | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);
  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);
  const [editBankAccount, setEditBankAccount] = useState<boolean>(false);
  const [editUserData, setEditUserData] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setIsLoaded(false);

    UserApi.getBankAccount(context.userId)
      .then((response) => {
        setBankAccount(response);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [context.userId]);

  useEffect(() => {
    UserApi.getUser(context.userId)
      .then((response) => {
        setUserData(response);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [context.userId]);

  const handleDelete = () => {
    setIsDeleteUser(true);
  };

  const handleEdit = () => {
    setEditUserData(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordModalOpen(true);
  };

  const ConfirmPasswordChange = (data: IChangePassword): void => {
    data.userId = context.userId;
    UserApi.changePassword(data).then((response) => {
      if (response) {
        toast("zalogowano", "success");
      } else {
        toast("bląd logowania", "error");
      }
    });
  };

  const ConfirmBankAccountChange = (data: IBankAccount): void => {
    setIsLoaded(false);
    UserApi.upsertBankAccount(data)
      .then((data) => {
        setBankAccount(data);
        toast(t("success"), "success");
      })
      .catch((err) => {
        toast(t("failure"), "error");
      })
      .finally(() => {
        setIsLoaded(true);
        setEditBankAccount(false);
      });
  };

  const handleCancelDeleteUser = () => {
    setIsDeleteUser(false);
  };

  const ConfirmChangeUserData = (data: IUserDto) => {
    setIsLoaded(true);
    UserApi.UpdateUserData(data, context.userId)
      .then((data) => {
        setUserData(data);
        toast(t("success"), "success");
      })
      .catch((err) => {
        toast(t("failure"), "error");
      })
      .finally(() => {
        setIsLoaded(true);
        setEditUserData(false);
      });
  };

  const handleAgreeDeleteUser = async (): Promise<void> => {
    UserApi.DeleteUser(context.userId).then((response) => {
      if (response) {
        toast("zalogowano", "success");
      } else {
        toast("bląd logowania", "error");
      }
    });
  };

  const handleEditBankAccount = (): void => {
    setEditBankAccount(true);
  };

  if (!isLoaded && !error) {
    return <CircularProgress />;
  }

  return (
    <>
      {userData !== null && (
        <>
          <PaperNav
            hasEdit={true}
            hasDelete={true}
            onDelete={handleDelete}
            onEdit={handleEdit}
            ExternalIcon={Lock}
            externalIconAction={handleChangePassword}
          />
          <Paper square>
            <UserInfoPaper data={userData} />
          </Paper>
        </>
      )}
      {bankAccount !== null && (
        <>
          <div style={{ marginTop: "10px" }}>
            <PaperNav
              header={t("BankAccountData")}
              hasEdit={true}
              hasDelete={false}
              onEdit={handleEditBankAccount}
            />

            <Paper square>
              <BankAccountPaper data={bankAccount} />
            </Paper>
          </div>
        </>
      )}

      <Modal
        header={t("changePassword")}
        isOpen={isChangePasswordModalOpen}
        handleClose={() => setIsChangePasswordModalOpen(false)}
        handleSave={ConfirmPasswordChange}
      >
        <ChangePasswordForm />
      </Modal>

      <Modal
        header={t("changeBankAccount")}
        isOpen={editBankAccount}
        handleClose={() => setEditBankAccount(false)}
        handleSave={ConfirmBankAccountChange}
        initValue={bankAccount as IBankAccount}
      >
        <ChangeBankAccountForm />
      </Modal>

      <Modal
        header={t("changeUserDAta")}
        isOpen={editUserData}
        handleClose={() => setEditUserData(false)}
        handleSave={ConfirmChangeUserData}
        initValue={userData as IUserDto}
      >
        <ChangeUserDataForm />
      </Modal>

      <Popper
        body={t("deleteUserConfirm")}
        title={t("deleteUser")}
        open={isDeleteUser}
        onCancel={handleCancelDeleteUser}
        onAgree={handleAgreeDeleteUser}
      />
    </>
  );
};

export default UserInfo;
