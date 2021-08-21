import {apiClient} from '../APIClient/apiClient'
import { ICategory, IBaseResponse } from '../../Interfaces/Api'


export const CategoriesApi = {
    getAll : async () : Promise<ICategory[]> => { 

        const response = await apiClient.get<IBaseResponse<ICategory[]>>('/categorys');

        if(response.data.success) {
            return new Promise<ICategory[]>((resolve) => resolve(response.data.data) );
        }

        return new Promise<ICategory[]>((_resolve, reject) => reject(null));

    }
}
