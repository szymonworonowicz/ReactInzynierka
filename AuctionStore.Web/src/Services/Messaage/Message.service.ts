import { IMessage } from "../../Interfaces/Message";
import {apiClient} from '../APIClient/apiClient'
import { IBaseResponse } from '../../Interfaces/Api';
import { IPageRequest, IPageResponse } from "../../Interfaces/Paged";


export interface IMessageService {
    getMessages : (userId : string | null, page: IPageRequest) => Promise<IPageResponse<IMessage>>;
    deleteMessage : (messageId : string) => Promise<boolean>
}

export const MessageService : IMessageService = {
    getMessages: async (userId: string | null, page: IPageRequest): Promise<IPageResponse<IMessage>> =>{
        const response = await apiClient.post<IBaseResponse<IPageResponse<IMessage>>>('/messages',{...page, userId});

        if(response.data.success) {
            return new Promise<IPageResponse<IMessage>>((resolve) => resolve(response.data.data) );
        }

        return new Promise<IPageResponse<IMessage>>((_resolve, reject) => reject(null));
    },
    deleteMessage: async(messageId : string) : Promise<boolean> => {
        const response = await apiClient.post<IBaseResponse<any>>('/messages/delete',{messageId});

        if(response.data.success) {
            return new Promise<boolean> ((resolve) => resolve(true));
        }

        return new Promise<boolean>((_resolve, reject) => reject(null));
    }
}