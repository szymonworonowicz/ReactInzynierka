import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import { PageRequestType, PageResponseType } from "../../Types/Paged";
import {AdminType, BannedUserType, BannedWordType } from "../../Types/Admin";
import { AuctionInfoType } from "../../Types/Auction";
import {AddBannedWordType} from '../../Types/Admin'

export const AdminApi = {
  getBannedUsers: async (
    data: PageRequestType
  ): Promise<PageResponseType<BannedUserType>> => {
    const response = await apiClient.post<
      IBaseResponse<PageResponseType<BannedUserType>>
    >("admins/bannedUser", data);

    if (response.data.success) {
      return new Promise<PageResponseType<BannedUserType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<PageResponseType<BannedUserType>>((_resolve, reject) =>
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
  getAdmins: async (data: PageRequestType): Promise<PageResponseType<AdminType>> => {
    const response = await apiClient.post<IBaseResponse<PageResponseType<AdminType>>>(
      "admins",
      data
    );

    if (response.data.success) {
      return new Promise<PageResponseType<AdminType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<PageResponseType<AdminType>>((_resolve, reject) =>
      reject(null)
    );
  },
  getBannedWords: async (
    data: PageRequestType
  ): Promise<PageResponseType<BannedWordType>> => {
    const response = await apiClient.post<
      IBaseResponse<PageResponseType<BannedWordType>>
    >("admins/bannedWords", data);

    if (response.data.success) {
      return new Promise<PageResponseType<BannedWordType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<PageResponseType<BannedWordType>>((_resolve, reject) =>
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

  GetAuctionInfo : async () : Promise<AuctionInfoType> => {
    const response = await apiClient.get<IBaseResponse<AuctionInfoType>>('admins/auctionInfo');

    if(response.data.success) {
      return new Promise<AuctionInfoType>((resolve) => resolve(response.data.data));
    }

    return new Promise<AuctionInfoType>((_resolve, reject) => reject(null));
  },
  
  UpsertAuctionInfo : async(data : AuctionInfoType) : Promise<AuctionInfoType> => {
    const response = await apiClient.post<IBaseResponse<AuctionInfoType>>('admins/auctionInfo',data);

    if(response.data.success) {
      return new Promise<AuctionInfoType>((resolve) => resolve(response.data.data));
    }

    return new Promise<AuctionInfoType>((_resolve, reject) => reject(null));
  },
  banUser : async(userId:string) : Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<boolean>>('admins/banUser',{userId});
    
    if(response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.data));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));

  }
};
