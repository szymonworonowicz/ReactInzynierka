import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Person, AccountCircle, PersonAdd } from "@material-ui/icons";
import Modal from "../../../shared/Modal/Modal";
import LoginForm from "../../../Forms/Auth/LoginForm";
import RegisterForm from "../../../Forms/Auth/RegisterForm";
import ResetPasswordRequiredForm from '../../../Forms/Auth/ResetPasswordRequiredForm'
import { authService } from "../../../Services/Auth/Auth.service";
import {
  ILoginCredentials,
  IRegisterCredentials,
} from "../../../Interfaces/Api";
import { UserRoles } from "../../../Helpers/constans";
import styles from "./LoginNav.module.css";
import { useToast } from "../../../shared/hooks/useToast";
import { IResetPasswordRequired } from "../../../Interfaces/user";

const LoginNav: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toast = useToast();
  const { t } = useTranslation();

  const IsLoginOpen = () => {
    setIsLogin((prev) => !prev);
  };

  const IsRegisterOpen = () => {
    setIsRegister((prev) => !prev);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const Login = async (data: ILoginCredentials) : Promise<void> => {
    if (await authService.login(data as ILoginCredentials)) {
      toast('zalogowano', 'success');
    }
    else {
      toast("bląąd logowania", "error");
    }
  };
  return (
    <>
      <IconButton onClick={handleMenuClick} className={styles.nav}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={IsLoginOpen}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={t("login")} />
        </MenuItem>
        <MenuItem onClick={IsRegisterOpen}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary={t("register")} />
        </MenuItem>
      </Menu>

      {isLogin && (
        <Modal
          header={t("login")}
          isOpen={isLogin}
          handleClose={() => setIsLogin(false)}
          handleSave={Login}
        >
          <LoginForm  
            setLogin={setIsLogin} 
            setResetPassword = {setIsResetPassword} 
            setRegister = {setIsRegister}
            />
        </Modal>
      )}
      {isRegister && (
        <Modal
          header={t("register")}
          isOpen={isRegister}
          handleClose={() => setIsRegister(false)}
          handleSave={(data: IRegisterCredentials) => {
            data.userType = UserRoles.User;
            authService.register(data);
          }}
        >
          <RegisterForm />
        </Modal>
      )}
      {isResetPassword && (
        <Modal
          header={t('resetPassword')}
          isOpen={isResetPassword}
          handleClose={() => setIsResetPassword(false)}
          handleSave={(data : IResetPasswordRequired) => {
            authService.resetPasswordRequired(data);
          }}
        >
          <ResetPasswordRequiredForm/>
        </Modal>
      )}
    </>
  );
};

export default LoginNav;
