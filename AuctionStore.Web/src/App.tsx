import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Theme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BlackTheme } from "./Themes/BlackTheme";
import { WhiteTheme } from "./Themes/WhiteTheme";
import { ContrastTheme } from "./Themes/ContrastTheme";

import { apiClient } from "./Services/APIClient/apiClient";
import { UserContext, InitialUserContext } from "./Context/UserContext";
import AppRouter from "./Routing/AppRouter";
import { UserDataType } from "./Types/User/user";
import { authService } from "./Services/Auth/Auth.service";
import { ThemeContext } from "./Context/ThemeContext";
import { LottieContext } from "./Context/LottieContext";
import { DictThemeTypes } from "./Enums";
import Loader from './shared/Loader/Loader'

const App: React.FC = () => {
  const [userContext, setUserContext] = useState<UserDataType>(InitialUserContext);
  const saveTheme = localStorage.getItem("theme") as string;
  const [theme, setTheme] = useState<DictThemeTypes>(
    parseInt(saveTheme) ?? DictThemeTypes.White
  );

  const [lottieOpen, setLottieOpen] = React.useState<boolean>(false);

  authService.onLogin = (authdata) => {
    setUserContext({
      userId: authdata.id,
      userName: authdata.name,
      userRole: authdata.role,
      userLogin: authdata.userName,
      isLogged: true,
    });
  };

  authService.onLogout = () => {
    setUserContext({
      userId: null,
      userName: null,
      userLogin: null,
      userRole: null,
      isLogged: false,
    });
  };

  const handleUserIdle = (e: Event): void => {
    console.log("user is idle", e);
    if (userContext.isLogged) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken === null) {
        console.log("no remember me, user logout", e);
        apiClient.logout(true);
      }
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 60,
    onIdle: handleUserIdle,
    debounce: 500,
  });

  const getThemePallete = (): Theme => {
    switch (theme) {
      case DictThemeTypes.Black:
        return BlackTheme;
      case DictThemeTypes.Contrast:
        return ContrastTheme;
      default:
        return WhiteTheme;
    }
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <UserContext.Provider value={userContext}>
          <ThemeProvider theme={getThemePallete()}>
            <LottieContext.Provider value={{isOpen:lottieOpen, setLottieOpen: setLottieOpen }}>
              <CssBaseline />
              <ToastContainer />
              <Loader isOpen={lottieOpen}/>
              <AppRouter />
            </LottieContext.Provider>
          </ThemeProvider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
