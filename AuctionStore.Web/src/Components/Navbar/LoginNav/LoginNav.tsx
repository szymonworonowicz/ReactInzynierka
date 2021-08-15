import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Modal from "../../../shared/Modal/Modal";
import LoginForm from "../../../Forms/LoginForm";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const LoginNav: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  const IsLoginOpen = (e: any) => {
    debugger;
    setIsLogin((prev) => !prev);
  };
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<PersonIcon />}
        onClick={IsLoginOpen}
      >
        {t("login")}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<PersonAddIcon />}
        onClick={() => setIsRegister((prev) => !prev)}
      >
        {t("register")}
      </Button>

      {isLogin && (
        <Modal
          header={t("login")}
          isOpen={isLogin}
          handleClose={() => setIsLogin(false)}
          handleSave={() => {
            console.log("save");
          }}
        >
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginNav;
