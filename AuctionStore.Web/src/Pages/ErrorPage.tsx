import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Lock } from "@material-ui/icons";

const useStyles = makeStyles({
  icon: {
    width: "20vw",
    height: "20vh",
  },
});

const ErrorPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Lock className={classes.icon} />
      <div>
          <p>{t('error_screen_message')}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
