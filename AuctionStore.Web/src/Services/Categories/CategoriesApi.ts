import {apiClient} from '../APIClient/apiClient'
import { ICategoryList, IBaseResponse } from '../../Interfaces/Api';
import {IAddCategory} from '../../Interfaces/Category';


export const CategoriesApi = {
    getAll : async () : Promise<ICategoryList[]> => { 

        const response = await apiClient.get<IBaseResponse<ICategoryList[]>>('/categorys');

        if(response.data.success) {
            return new Promise<ICategoryList[]>((resolve) => resolve(response.data.data) );
        }

        return new Promise<ICategoryList[]>((_resolve, reject) => reject(null));
    },
    deleteCategory : async (id: string) : Promise<boolean> => {
        const response = await apiClient.post<IBaseResponse<any>>(`/categorys/deleteCategory`, {id});

        if(response.data.success) {
            return new Promise<boolean>((resolve) => resolve(response.data.success));
        }
        
        return new Promise<boolean>((_resolve, reject) => reject(null));
    },
    deleteSubCategory : async (id: string) : Promise<boolean> => {
        const response = await apiClient.post<IBaseResponse<any>>(`/categorys/deleteSubCategory`, {id});

        if(response.data.success) {
            return new Promise<boolean>((resolve) => resolve(response.data.success));
        }
        
        return new Promise<boolean>((_resolve, reject) => reject(null));
    },
    getCategories : async() : Promise<Array<IAddCategory>> => {
        const response = await apiClient.get<IBaseResponse<IAddCategory[]>>('/categorys/getCategories');

        if(response.data.success) {
            return new Promise<IAddCategory[]>((resolve) => resolve(response.data.data) );
        }

        return new Promise<IAddCategory[]>((_resolve, reject) => reject(null));
    },
    AddCategory : async(data: IAddCategory) : Promise<ICategoryList> => {
        const response = await apiClient.post<IBaseResponse<ICategoryList>>('/categorys/AddCategory', data);

        if(response.data.success) {
            return new Promise<ICategoryList>((resolve) => resolve(response.data.data) );
        }

        return new Promise<ICategoryList>((_resolve, reject) => reject(null));
    }
}
