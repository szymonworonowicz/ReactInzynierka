import {apiClient} from '../APIClient/apiClient'
import { IBaseResponse } from '../../Interfaces/Api'
import {IUserDto, IChangePassword, IAddress, IBankAccount } from '../../Interfaces/user';

export const UserApi = {
    getUser: async(userId : string | null): Promise<IUserDto> => {
        const response = await apiClient.post<IBaseResponse<IUserDto>>(`users/`,{userId})

        if(response.data.success) {
            return new Promise<IUserDto>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IUserDto>((_resolve, reject) => reject(null));
    },
    changePassword: async(data : IChangePassword) : Promise<boolean> => {
        const response = await apiClient.post<IBaseResponse<any>>(`users/changePassword`, data);

        if(response.data.success) {
            return new Promise<boolean>((resolve) => resolve(response.data.success));
        }
        
        return new Promise<boolean>((_resolve, reject) => reject(null));
    },
    DeleteUser :async(userId : string | null) : Promise<boolean> => {
        const response = await apiClient.post<IBaseResponse<any>>(`users/deleteUser`, {userId});

        if(response.data.success) {
            return new Promise<boolean>((resolve) => resolve(response.data.success));
        }
        
        return new Promise<boolean>((_resolve, reject) => reject(null));
    },
    getAddresses : async(userId : string | null) : Promise<Array<IAddress>> => {
        const response = await apiClient.post<IBaseResponse<Array<IAddress>>>('users/getAddress',{userId});

        if(response.data.success) {
            return new Promise<Array<IAddress>>((resolve => resolve(response.data.data)));
        }

        return new Promise<Array<IAddress>>((_resolve, reject) => reject(null));
    },
    deleteAddress : async(addressId : string) : Promise<boolean> =>{
        const response = await apiClient.post<IBaseResponse<any>>('users/deleteAddress', {addressId});

        if(response.data.success) {
            return new Promise<boolean>((resolve) => resolve(response.data.success));
        }
        
        return new Promise<boolean>((_resolve, reject) => reject(null));
    },
    UpsertAddress : async(address: IAddress, userId : string | null): Promise<IAddress> => {
        const response = await apiClient.post<IBaseResponse<IAddress>>('users/upsertAddress', {...address, userId});

        if(response.data.success) {
            return new Promise<IAddress>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IAddress>((_resolve, reject) => reject(null));
    },
    getBankAccount : async (userId : string | null)  : Promise<IBankAccount> => {
        const response = await apiClient.post<IBaseResponse<IBankAccount>>('users/getBankAccount', {userId});

        if(response.data.success) {
            return new Promise<IBankAccount>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IBankAccount>((_resolve, reject) => reject(null));
    },

    upsertBankAccount : async(data: IBankAccount): Promise<IBankAccount> => {
        const response = await apiClient.post<IBaseResponse<IBankAccount>>('users/upsertBankAccount', {data});

        if(response.data.success) {
            return new Promise<IBankAccount>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IBankAccount>((_resolve, reject) => reject(null));
    },
    UpdateUserData : async (data : IUserDto, userId : string | null) : Promise<IUserDto> => {
        const response = await apiClient.post<IBaseResponse<IUserDto>>('users/update', {...data, userId});

        if(response.data.success) {
            return new Promise<IUserDto>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IUserDto>((_resolve, reject) => reject(null));
    }
}