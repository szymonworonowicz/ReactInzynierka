import { IBaseResponse, ILoginCredentials,IRegisterCredentials,ILoginResult } from "../../Interfaces/Api";
import { apiClient } from "../APIClient/apiClient";
import JWTDecode from "jwt-decode";
import { history } from "../../Helpers";
import { ResetPasswordRequiredType ,ResetPasswordType} from "../../Types/User/user";

export interface IAuthService {
  login: (credentials: ILoginCredentials) => Promise<boolean>;
  logout: () => void;
  onLogin?: (userData: IUserAuthData) => void;
  onLogout?: () => void;
  register : (credentials : IRegisterCredentials) => Promise<boolean>;
  resetPasswordRequired : (data : ResetPasswordRequiredType) => Promise<boolean>;
  resetPassword : (data : ResetPasswordType) => Promise<boolean>;
}

export interface IUserAuthData {
  id: string | null;
  userName: string | null;
  name: string | null;
  role: string | null;
}

export const authService: IAuthService = {
  login: async (credentials: ILoginCredentials): Promise<boolean> => {
    try {
      const response = await apiClient.post<IBaseResponse<ILoginResult>>("auths/login", {
        UserName: credentials.username,
        Password: credentials.password,
      });

      if (response.data.success === false) {
        return new Promise<boolean>((_resolve, reject) => {
          reject(response.data.errors[0].message);
        });
      }

      if(response.data.data.isBanned === true ) {
        return new Promise<boolean>((_resolve, reject) => {
          reject(true);
        })
      }

      localStorage.setItem("access_token", response.data.data.accessToken);

      const userData = getUserDataFromAccessToken();

      if (userData) {
        if (typeof authService.onLogin === "function") {
          authService.onLogin(userData);
        }
      }
      sessionStorage.setItem("refresh_token", response.data.data.refreshToken);
      sessionStorage.setItem("userName", userData?.userName ?? '');

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

    // history.push("/");
  },

  register : async (credentials : IRegisterCredentials) : Promise<boolean> => {
    const response = await apiClient.post('auths/register', credentials);

    if(response.data.success === false) {
      return new Promise<boolean>((_resolve, reject) => {
        reject(response.data.errors[0].message)
      })
    }

    return new Promise<boolean>((resolve) => {
      resolve(true);
    })
  },

  resetPasswordRequired : async(data: ResetPasswordRequiredType) : Promise<boolean> => {
    const response = await apiClient.post('auths/resetPasswordRequest', data);
    
    if(response.data.success === false) {
      return new Promise<boolean>((_resolve, reject) => {
        reject(response.data.errors[0].message)
      })
    }

    return new Promise<boolean>((resolve) => {
      resolve(true);
    })
    
  },

  resetPassword : async(data : ResetPasswordType) : Promise<boolean> => {
    const response = await apiClient.post('auths/resetPassword', data);

    if(response.data.success === false) {
      return new Promise<boolean>((_resolve, reject) => {
        reject(response.data.errors[0].message)
      })
    }

    return new Promise<boolean>((resolve) => {
      resolve(true);
    })
  }
};

export const getUserDataFromAccessToken = (): IUserAuthData | null => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    const decodedToken = JWTDecode(accessToken) as any;

    const role = decodedToken["role"];

    const userDataClaim =
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata";
    const userData = decodedToken[userDataClaim];

    const authData: IUserAuthData = {
      id: decodedToken.nameid,
      userName: decodedToken.unique_name,
      name: userData,
      role: role,
    };

    return authData;
  }

  return null;
};
