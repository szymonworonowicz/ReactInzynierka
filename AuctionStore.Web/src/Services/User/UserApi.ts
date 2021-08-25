import {apiClient} from '../APIClient/apiClient'
import { IBaseResponse } from '../../Interfaces/Api'
import {IUserInfo, IChangePassword,IBannedUser } from '../../Interfaces/user';
import {IPageRequest, IPageResponse} from '../../Interfaces/Paged';

export const UserApi = {
    getUser: async(userId : string | null): Promise<IUserInfo> => {
        const response = await apiClient.get<IBaseResponse<IUserInfo>>(`users/${userId}/user`)

        if(response.data.success) {
            return new Promise<IUserInfo>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IUserInfo>((_resolve, reject) => reject(null));
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
    getBannedUsers : async(data : IPageRequest) : Promise<IPageResponse<IBannedUser>> => {
        const response = await apiClient.post<IBaseResponse<IPageResponse<IBannedUser>>>('users/bannedUser', data);

        if(response.data.success) {
            return new Promise<IPageResponse<IBannedUser>>((resolve) => resolve(response.data.data));
        }

        return new Promise<IPageResponse<IBannedUser>>((_resolve, reject) => reject(null));
    }

}