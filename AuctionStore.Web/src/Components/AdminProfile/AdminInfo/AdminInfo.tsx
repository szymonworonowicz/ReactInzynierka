import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { IUserInfo, IChangePassword } from "../../../Interfaces/user";
import { UserApi } from "../../../Services/User/UserApi";
import { UserContext } from "../../../Context/UserContext";
import { CircularProgress, Paper } from "@material-ui/core";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import AdminInfoPaper from "./AdminInfoPaper/AdminInfoPaper";
import { Lock } from "@material-ui/icons";
import Modal from "../../../shared/Modal/Modal";
import Popper from "../../../shared/Popper/Popper";
import ChangePasswordForm from "../../../Forms/ChangePasswordForm";
import { useToast } from "../../../shared/hooks/useToast";

const AdminInfo: React.FC = () => {
  const context = useContext(UserContext);
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);
  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await UserApi.getUser(context.userId);

        setUserData(data);
        setIsLoaded(true);
      } catch {
        setError(true);
        alert("error");
      }
    })();
  }, [context.userId]);

  const onDelete = () => {
    setIsDeleteUser(true);
  };

  const onEdit = () => {
    
  };

  const handleChangePassword = () => {
    setIsChangePasswordModalOpen(true);
  };

  const ConfirmPasswordChange = async (
    data: IChangePassword
  ): Promise<void> => {
    data.userId = context.userId;
    if (await UserApi.changePassword(data)) {
      toast("zalogowano", "success");
    } else {
      toast("bląd logowania", "error");
    }
  };

  const onCancelDeleteUser = () => {
    setIsDeleteUser(false);
  };

  const onAgreeDeleteUser = async (): Promise<void> => {
    debugger;
    if (await UserApi.DeleteUser(context.userId)) {
      toast("zalogowano", "success");
    } else {
      toast("bląd logowania", "error");
    }
  };

  if (!isLoaded && !error) {
    return <CircularProgress />;
  }

  return (
    <>
      <PaperNav
        header={t("userData")}
        hasEdit={true}
        hasDelete={true}
        onDelete={onDelete}
        onEdit={onEdit}
        ExternalIcon={Lock}
        externalIconAction={handleChangePassword}
      />
      <Paper square>{<AdminInfoPaper data={userData} />}</Paper>

      <Modal
        header={t("change_password")}
        isOpen={isChangePasswordModalOpen}
        handleClose={() => setIsChangePasswordModalOpen(false)}
        handleSave={ConfirmPasswordChange}
      >
        <ChangePasswordForm />
      </Modal>

      <Popper
        body={t("deleteUserConfirm")}
        title={t("deleteUser")}
        open={isDeleteUser}
        onCancel={onCancelDeleteUser}
        onAgree={onAgreeDeleteUser}
      />
    </>
  );
};

export default AdminInfo;
