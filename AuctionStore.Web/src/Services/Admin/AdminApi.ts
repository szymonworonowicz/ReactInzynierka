import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import { IPageRequest, IPageResponse } from "../../Interfaces/Paged";
import {AdminType, BannedUserType, BannedWordType } from "../../Types/Admin";
import { IAuctionInfo } from "../../Interfaces/Auctions";
import {AddBannedWordType} from '../../Types/Admin/'

export const AdminApi = {
  getBannedUsers: async (
    data: IPageRequest
  ): Promise<IPageResponse<BannedUserType>> => {
    const response = await apiClient.post<
      IBaseResponse<IPageResponse<BannedUserType>>
    >("admins/bannedUser", data);

    if (response.data.success) {
      return new Promise<IPageResponse<BannedUserType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<IPageResponse<BannedUserType>>((_resolve, reject) =>
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
  getAdmins: async (data: IPageRequest): Promise<IPageResponse<AdminType>> => {
    const response = await apiClient.post<IBaseResponse<IPageResponse<AdminType>>>(
      "admins",
      data
    );

    if (response.data.success) {
      return new Promise<IPageResponse<AdminType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<IPageResponse<AdminType>>((_resolve, reject) =>
      reject(null)
    );
  },
  getBannedWords: async (
    data: IPageRequest
  ): Promise<IPageResponse<BannedWordType>> => {
    const response = await apiClient.post<
      IBaseResponse<IPageResponse<BannedWordType>>
    >("admins/bannedWords", data);

    if (response.data.success) {
      return new Promise<IPageResponse<BannedWordType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<IPageResponse<BannedWordType>>((_resolve, reject) =>
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
    const response = await apiClient.post<IBaseResponse<any>>("admins/delete", {
      id,
    });

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  deleteBannedWord: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>("admins/deleteBannedWord", {
      id,
    });

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },

  AddNewBannedWord : async (newWord : AddBannedWordType) : Promise<BannedWordType> => {
    const response = await apiClient.post<IBaseResponse<BannedWordType>>('admins/addBannedWord', newWord);

    if(response.data.success) {
      return new Promise<BannedWordType>((resolve) => resolve(response.data.data));
    }

    return new Promise<BannedWordType>((_resolve, reject) => reject(null));
  },

  GetAuctionInfo : async () : Promise<IAuctionInfo> => {
    const response = await apiClient.get<IBaseResponse<IAuctionInfo>>('admins/auctionInfo');

    if(response.data.success) {
      return new Promise<IAuctionInfo>((resolve) => resolve(response.data.data));
    }

    return new Promise<IAuctionInfo>((_resolve, reject) => reject(null));
  },
  
  UpsertAuctionInfo : async(data : IAuctionInfo) : Promise<IAuctionInfo> => {
    const response = await apiClient.post<IBaseResponse<IAuctionInfo>>('admins/auctionInfo',data);

    if(response.data.success) {
      return new Promise<IAuctionInfo>((resolve) => resolve(response.data.data));
    }

    return new Promise<IAuctionInfo>((_resolve, reject) => reject(null));
  },
  banUser : async(userId:string) : Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<boolean>>('admins/banUser',{userId});
    
    if(response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.data));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));

  }
};
