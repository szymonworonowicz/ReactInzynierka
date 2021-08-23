import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { IUserInfo } from "../../../Interfaces/user";
import { UserApi } from "../../../Services/User/UserApi";
import { UserContext } from "../../../Context/UserContext";
import { CircularProgress, Paper } from "@material-ui/core";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import AdminInfoPaper from './AdminInfoPaper/AdminInfoPaper';
import { Lock } from "@material-ui/icons";

const AdminInfo: React.FC = () => {
  const context = useContext(UserContext);
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { t } = useTranslation();

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

  const onDelete = () => {};

  const onEdit = () => {};

  const handleChangePassword = () => {

  }

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
        ExternalIcon = {Lock}
        externalIconAction = {handleChangePassword}
      />
      <Paper square>
          {

                <AdminInfoPaper data={userData}/>

          }
      </Paper>
    </>
  );
};

export default AdminInfo;
