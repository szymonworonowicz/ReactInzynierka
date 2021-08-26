import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import { IPageRequest, IPageResponse } from "../../Interfaces/Paged";
import { IAdmin, IBannedUser } from "../../Interfaces/Admin";

export const AdminApi = {
  getBannedUsers: async (
    data: IPageRequest
  ): Promise<IPageResponse<IBannedUser>> => {
    const response = await apiClient.post<
      IBaseResponse<IPageResponse<IBannedUser>>
    >("admins/bannedUser", data);

    if (response.data.success) {
      return new Promise<IPageResponse<IBannedUser>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<IPageResponse<IBannedUser>>((_resolve, reject) =>
      reject(null)
    );
  },
  UnBanUser: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "admins/unbanUser",
      { id }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  getAdmins: async (data: IPageRequest): Promise<IPageResponse<IAdmin>> => {
    const response = await apiClient.post<IBaseResponse<IPageResponse<IAdmin>>>(
      "admins",
      data
    );

    if (response.data.success) {
      return new Promise<IPageResponse<IAdmin>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<IPageResponse<IAdmin>>((_resolve, reject) =>
      reject(null)
    );
  },
  AdminHoliday: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
        "admins/holiday",
        { id }
      );
  
      if (response.data.success) {
        return new Promise<boolean>((resolve) => resolve(response.data.success));
      }
  
      return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  AdminDelete: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
        "admins/delete",
        { id }
      );
  
      if (response.data.success) {
        return new Promise<boolean>((resolve) => resolve(response.data.success));
      }
  
      return new Promise<boolean>((_resolve, reject) => reject(null));
  },
};
