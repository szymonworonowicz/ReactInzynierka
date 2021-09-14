import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { IUserDto, IChangePassword } from "../../../Interfaces/user";
import { UserApi } from "../../../Services/User/UserApi";
import { UserContext } from "../../../Context/UserContext";
import { CircularProgress, Paper } from "@material-ui/core";
import PaperNav from "../PaperNav/PaperNav";
import UserInfoPaper from "./UserInfoPaper/UserInfoPaper";
import { Lock } from "@material-ui/icons";
import Modal from "../../../shared/Modal/Modal";
import Popper from "../../../shared/Popper/Popper";
import ChangePasswordForm from "../../../Forms/Auth/ChangePasswordForm";
import { useToast } from "../../../shared/hooks/useToast";

const UserInfo: React.FC = () => {
  const context = useContext(UserContext);
  const [userData, setUserData] = useState<IUserDto | null>(null);
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

  const handleDelete = () => {
    setIsDeleteUser(true);
  };

  const handleEdit = () => {
    //@TODO UserEdit
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

  const handleCancelDeleteUser = () => {
    setIsDeleteUser(false);
  };

  const handleAgreeDeleteUser = async (): Promise<void> => {
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
        onDelete={handleDelete}
        onEdit={handleEdit}
        ExternalIcon={Lock}
        externalIconAction={handleChangePassword}
      />
      <Paper square>
        <UserInfoPaper data={userData} />
      </Paper>

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
        onCancel={handleCancelDeleteUser}
        onAgree={handleAgreeDeleteUser}
      />
    </>
  );
};

export default UserInfo;
