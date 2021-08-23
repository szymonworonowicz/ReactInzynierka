import { createContext } from "react";
import {IUserData} from '../Interfaces/user'
import { getUserDataFromAccessToken } from "../Services/Auth/Auth.service";

export const InitialUserContext : IUserData = {
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

export const UserContext = createContext<IUserData>(InitialUserContext);