import { ILoginCredentials } from "../Interfaces/Api";
import { apiClient } from "./APIClient/apiClient";
import JWTDecode from "jwt-decode";
import { history } from "../Helpers";

export interface IAuthService {
  login: (credentials: ILoginCredentials) => Promise<boolean>;
  logout: () => void;
  onLogin?: (userData: IUserAuthData) => void;
  onLogout?: () => void;
}

export interface IUserAuthData {
  id: string | null;
  userName: string | null;
  name: string | null;
  roles: Array<string> | null;
}

export const authService: IAuthService = {
  login: async (credentials: ILoginCredentials): Promise<boolean> => {
    try {
      const response = await apiClient.post("auth/login", {
        UserName: credentials.username,
        Password: credentials.password,
      });

      if (response.data.success === false) {
        return new Promise<boolean>((_resolve, reject) => {
          reject(response.data.errors[0].message);
        });
      }

      localStorage.setItem("access_token", response.data.data.accessToken);

      const userData = getUserDataFromAccessToken();

      if (userData) {
        if (typeof authService.onLogin === "function") {
          authService.onLogin(userData);
        }
      }

      sessionStorage.setItem("refresh_token", response.data.data.refreshToken);
      sessionStorage.setItem("userName", response.data.data.userName);

      return new Promise<boolean>((resolve) => resolve(true));
    } catch (error) {
      return new Promise<boolean>((_resolve, reject) => reject(error));
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    if (typeof authService.onLogout === "function") {
      authService.onLogout();
    }

    history.push("/");
  },
};

export const getUserDataFromAccessToken = (): IUserAuthData | null => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    const decodedToken = JWTDecode(accessToken) as any;

    const roles = decodedToken["role"];

    const userDataClaim =
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata";
    const userData = decodedToken[userDataClaim];

    const authData: IUserAuthData = {
      id: decodedToken.nameid,
      userName: decodedToken.unique_name,
      name: userData,
      roles: Array.isArray(roles) ? roles : [roles],
    };

    return authData;
  }

  return null;
};