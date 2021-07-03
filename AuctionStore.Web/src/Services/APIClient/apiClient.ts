import axios, { AxiosInstance } from "axios";
import { history } from "../../Helpers";
import { getUserDataFromAccessToken, authService } from "../Auth.service";

interface IApiClient extends AxiosInstance {
  logout(redirectToHomePage: boolean): void;
}

export const apiClient = axios.create({
  baseURL: (window as any).API_URL,
  timeout: 100000,
}) as IApiClient;

apiClient.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = (function () {
      return `Bearer ${sessionStorage.getItem("access_token")}`;
    })();

    config.headers["ClientTimeZone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.response.config;

    if (error.response.status === 400) {
      return new Promise((resolve) => {
        resolve(error.response);
      });
    }

    if (error.response.status === 403) {
      return new Promise((resolve) => {
        resolve(error.response);
      });
    }

    if (error.response.status === 404) {
      return new Promise((resolve) => {
        resolve(error.response);
      });
    }

    if (error.response.status === 405) {
      return new Promise((resolve) => {
        resolve(error.response);
      });
    }

    if (error.response.status !== 401) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }

    if (error.config_url === "auth/refresh") {
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("access_token");
      sessionStorage.remove("user_name");

      history.push(`/login?returnUrl=${window.location.href}`);

      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status !== 401) {
      return;
    }

    //try request with new Token

    try {
      return new Promise((resolve, reject) => {
        const refreshToken = sessionStorage.getItem("refresh_token");
        const userName = sessionStorage.getItem("userName");

        if (refreshToken === null) {
          history.push(`/login?returnUrl=${window.location.href}`);
          reject(error);
        }

        apiClient
          .post("auth/login/refresh", {
            refreshToken,
            userName,
          })
          .then((res) => {
            const response = res.data;

            sessionStorage.setItem("access_token", response.data.accessToken);

            if (sessionStorage.getItem("refresh_token")) {
              sessionStorage.setItem(
                "refresh_token",
                response.data.refreshToken
              );
            }

            const userData = getUserDataFromAccessToken();

            if (userData !== null) {
              if (typeof authService.onLogin === "function") {
                authService.onLogin(userData);
              }
            }

            resolve(apiClient.request(originalRequest));
          });
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  }
);

apiClient.logout = (redirectToHome : boolean) => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('user_name');

  if(redirectToHome) {
    history.push('/');
  }
}
