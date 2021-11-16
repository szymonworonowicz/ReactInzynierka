import { createContext } from "react";
import {UserDataType} from '../Types/User/user'
import { getUserDataFromAccessToken } from "../Services/Auth/Auth.service";

export const InitialUserContext : UserDataType = {
  isLogged : false,
  userId : null,
  userName : null,
  userLogin : null,
  userRole: null
}

const tokenData = getUserDataFromAccessToken();

if (tokenData != null) {
  InitialUserContext.isLogged = tokenData.id != null;
  InitialUserContext.userId = tokenData.id;
  InitialUserContext.userName = tokenData.name;
  InitialUserContext.userLogin = tokenData.userName;
  InitialUserContext.userRole = tokenData.role;
}

export const UserContext = createContext<UserDataType>(InitialUserContext);