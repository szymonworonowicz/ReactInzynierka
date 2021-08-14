import React from "react";
import { useIdleTimer } from "react-idle-timer";

import { CssBaseline } from "@material-ui/core";

import { apiClient } from "./Services/APIClient/apiClient";
import { UserContext } from "./Context/UserContext";
import AppRouter from './Routing/AppRouter';
import {useUserContext} from './shared/hooks/useUserContext'



const App: React.FC = () => {

  const userContextValue = useUserContext();

  const onUserIdle = (e: Event): void => {
    console.log("user is idle", e);
    if (userContextValue.isLogged) {
      var refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken === null) {
        console.log("no remember me, user logout", e);
        apiClient.logout(true);
      }
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 60,
    onIdle : onUserIdle,
    debounce :500,
  });

  return (
    <>
      <CssBaseline />
      <UserContext.Provider value={userContextValue}>
        <AppRouter/>
      </UserContext.Provider>
    </>
  );
};

export default  App;
