import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import {
  UserInfoType,
  ChangePasswordType,
  AddressType,
  BankAccountType,
} from "../../Types/User/";

export const UserApi = {
  getUser: async (userId: string | null): Promise<UserInfoType> => {
    const response = await apiClient.post<IBaseResponse<UserInfoType>>(`users/`, {
      userId,
    });

    if (response.data.success) {
      return new Promise<UserInfoType>((resolve) => resolve(response.data.data));
    }

    return new Promise<UserInfoType>((_resolve, reject) => reject(null));
  },
  changePassword: async (data: ChangePasswordType): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      `users/changePassword`,
      data
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  DeleteUser: async (userId: string | null): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      `users/deleteUser`,
      { userId }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  getAddresses: async (userId: string | null): Promise<Array<AddressType>> => {
    const response = await apiClient.post<IBaseResponse<Array<AddressType>>>(
      "users/getAddress",
      { userId }
    );

    if (response.data.success) {
      return new Promise<Array<AddressType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<Array<AddressType>>((_resolve, reject) => reject(null));
  },
  deleteAddress: async (addressId: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "users/deleteAddress",
      { addressId }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  UpsertAddress: async (
    address: AddressType,
    userId: string | null
  ): Promise<AddressType> => {
    const response = await apiClient.post<IBaseResponse<AddressType>>(
      "users/upsertAddress",
      { ...address, userId }
    );

    if (response.data.success) {
      return new Promise<AddressType>((resolve) => resolve(response.data.data));
    }

    return new Promise<AddressType>((_resolve, reject) => reject(null));
  },
  getBankAccount: async (userId: string | null): Promise<BankAccountType> => {
    const response = await apiClient.post<IBaseResponse<BankAccountType>>(
      "users/getBankAccount",
      { userId }
    );

    if (response.data.success) {
      return new Promise<BankAccountType>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<BankAccountType>((_resolve, reject) => reject(null));
  },

  upsertBankAccount: async (data: BankAccountType): Promise<BankAccountType> => {
    const response = await apiClient.post<IBaseResponse<BankAccountType>>(
      "users/upsertBankAccount",
      { data }
    );

    if (response.data.success) {
      return new Promise<BankAccountType>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<BankAccountType>((_resolve, reject) => reject(null));
  },
  UpdateUserData: async (
    data: UserInfoType,
    userId: string | null
  ): Promise<UserInfoType> => {
    const response = await apiClient.post<IBaseResponse<UserInfoType>>(
      "users/update",
      { ...data, userId }
    );

    if (response.data.success) {
      return new Promise<UserInfoType>((resolve) => resolve(response.data.data));
    }

    return new Promise<UserInfoType>((_resolve, reject) => reject(null));
  },
  getAddress: async (id: string): Promise<AddressType> => {
    const response = await apiClient.post<IBaseResponse<AddressType>>(
      "users/getOneAddress",
      { id }
    );

    if (response.data.success) {
      return new Promise<AddressType>((resolve) => resolve(response.data.data));
    }

    return new Promise<AddressType>((_resolve, reject) => reject(null));
  },
  getBankAccountForAuction: async (
    auctionId: string
  ): Promise<BankAccountType> => {
    const response = await apiClient.post<IBaseResponse<BankAccountType>>(
      "users/getBankAccountForAuction",
      { auctionId }
    );

    if (response.data.success) {
      return new Promise<BankAccountType>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<BankAccountType>((_resolve, reject) => reject(null));
  },
};
