import { apiClient } from "../APIClient/apiClient";
import {
  AddAuctionType,
  AuctionType,
  AuctionDetailsType,
  AuctionInfoType,
  AuctionConfirmationFormType,
  AuctionConfirmResultType,
} from "../../Types/Auction";
import { IBaseResponse } from "../../Interfaces/Api";
import { PageRequestType, PageResponseType } from "../../Types/Paged";

export const AuctionApi = {
  getAllByCategory: async (
    data: PageRequestType,
    categoryId: string
  ): Promise<PageResponseType<AuctionType>> => {
    const response = await apiClient.post<
      IBaseResponse<PageResponseType<AuctionType>>
    >("auctions/", { categoryId, ...data });

    if (response.data.success) {
      return new Promise<PageResponseType<AuctionType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<PageResponseType<AuctionType>>((_resolve, reject) =>
      reject(null)
    );
  },

  getAuctionInfo: async (): Promise<AuctionInfoType> => {
    const response = await apiClient.get<IBaseResponse<AuctionInfoType>>(
      "auctions/auctionInfo"
    );

    if (response.data.success) {
      return new Promise<AuctionInfoType>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<AuctionInfoType>((_resolve, reject) => reject(null));
  },

  addAuction: async (data: AddAuctionType): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "/auctions/addAuction",
      data
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },

  getAuction: async (auctionId: string): Promise<AuctionDetailsType> => {
    const response = await apiClient.post<IBaseResponse<AuctionDetailsType>>(
      "/auctions/getAuction",
      { auctionId }
    );

    if (response.data.success) {
      return new Promise<AuctionDetailsType>((resolve) => {
        resolve(response.data.data);
      });
    }

    return new Promise<AuctionDetailsType>((_resolve, reject) => {
      reject(null);
    });
  },

  deleteAuction: async (auctionId: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "/auctions/deleteAuction",
      { auctionId }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },

  getUserAuction: async (
    data: PageRequestType,
    userId: string,
    isWinning: boolean
  ): Promise<PageResponseType<AuctionType>> => {
    const response = await apiClient.post<
      IBaseResponse<PageResponseType<AuctionType>>
    >("/auctions/userAuction", { userId, isWinning, ...data });

    if (response.data.success) {
      return new Promise<PageResponseType<AuctionType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<PageResponseType<AuctionType>>((_resolve, reject) =>
      reject(null)
    );
  },
  checkWrongWord: async (
    description: string,
    title: string
  ): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<boolean>>(
      "/auctions/checkBadWords",
      { title, description }
    );

    if (response.data.data) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  getNewestAuctions: async (): Promise<Array<AuctionType>> => {
    const response = await apiClient.get<IBaseResponse<Array<AuctionType>>>(
      "/auctions/getNewestAuctions"
    );

    if (response.data.success) {
      return new Promise<Array<AuctionType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<Array<AuctionType>>((_resolve, reject) => reject(null));
  },
  getTrendingAuctions: async (): Promise<Array<AuctionType>> => {
    const response = await apiClient.get<IBaseResponse<Array<AuctionType>>>(
      "/auctions/getTrendingAuctions"
    );

    if (response.data.success) {
      return new Promise<Array<AuctionType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<Array<AuctionType>>((_resolve, reject) => reject(null));
  },
  confirmAuction: async (
    data: AuctionConfirmationFormType,
    winningUserId: string | null
  ): Promise<AuctionConfirmResultType> => {
    const response = await apiClient.post<
      IBaseResponse<AuctionConfirmResultType>
    >("/auctions/confirmAuctionDelivery", { ...data, winningUserId });

    if (response.data.success) {
      return new Promise<AuctionConfirmResultType>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<AuctionConfirmResultType>((_resolve, reject) =>
      reject(null)
    );
  },
};
