import {apiClient} from '../APIClient/apiClient'
import { IBaseResponse } from '../../Interfaces/Api'
import {IUserInfo} from '../../Interfaces/user'

export const UserApi = {
    getUser: async(userId : string | null): Promise<IUserInfo> => {
        const response = await apiClient.get<IBaseResponse<IUserInfo>>(`${userId}/user`)

        if(response.data.success) {
            return new Promise<IUserInfo>((resolve) => resolve(response.data.data));
        }
        
        return new Promise<IUserInfo>((_resolve, reject) => reject(null));
    }
}