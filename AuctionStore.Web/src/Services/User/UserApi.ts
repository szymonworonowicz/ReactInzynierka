import {apiClient} from '../APIClient/apiClient'
import { IBaseResponse } from '../../Interfaces/Api'
import {IUserDto, IChangePassword, IAddress } from '../../Interfaces/user';

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
    }
}