import React,{useState} from "react";
import { useIdleTimer } from "react-idle-timer";

import { CssBaseline } from "@material-ui/core";

import { apiClient } from "./Services/APIClient/apiClient";
import { UserContext,InitialUserContext } from "./Context/UserContext";
import AppRouter from './Routing/AppRouter';
import { IUserData } from "./Interfaces/user";
import { authService } from "./Services/Auth/Auth.service";


const App: React.FC = () => {

  const [userContext,setUserContext] = useState<IUserData>(InitialUserContext);

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


  const onUserIdle = (e: Event): void => {
    console.log("user is idle", e);
    if (userContext.isLogged) {
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
      <UserContext.Provider value={userContext}>
        <AppRouter/>
      </UserContext.Provider>
    </>
  );
};

export default  App;
