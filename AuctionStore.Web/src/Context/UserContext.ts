import { createContext } from "react";
import {IUserData} from '../Interfaces/user'

export const UserContext = createContext <IUserData>({
  userId: null,
  userName: null,
  userRole: null,
  userLogin: null,
  isLogged: true,
});
