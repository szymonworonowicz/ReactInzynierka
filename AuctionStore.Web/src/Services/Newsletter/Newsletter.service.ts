import {apiClient} from '../APIClient/apiClient'
import { IBaseResponse } from '../../Interfaces/Api';
import {INewsletterInfo} from '../../Interfaces/Newsletter'

interface INewsletterService {
    sendNewsletter : (data : INewsletterInfo) => Promise<boolean>
}

export const NewsletterService : INewsletterService = {

    sendNewsletter : async(data:INewsletterInfo) : Promise<boolean> => {
        const response = await apiClient.post<IBaseResponse<any>>('/newsletters/addNewsletter', data);

        if(response.data.success) {
            return new Promise<boolean> ((resolve) => resolve(true));
        }

        return new Promise<boolean>((_resolve, reject) => reject(null));
    }
}