import {apiClient} from '../APIClient/apiClient'
import {IBaseResponse } from '../../Interfaces/Api';
import {IAddCategory} from '../../Interfaces/Category';
import { CategoryType } from '../../Types/Categories';


export const CategoriesApi = {
    getAll : async () : Promise<CategoryType[]> => { 

        const response = await apiClient.get<IBaseResponse<CategoryType[]>>('/categorys');

        if(response.data.success) {
            return new Promise<CategoryType[]>((resolve) => resolve(response.data.data) );
        }

        return new Promise<CategoryType[]>((_resolve, reject) => reject(null));
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
    AddCategory : async(data: IAddCategory) : Promise<CategoryType> => {
        const response = await apiClient.post<IBaseResponse<CategoryType>>('/categorys/AddCategory', data);

        if(response.data.success) {
            return new Promise<CategoryType>((resolve) => resolve(response.data.data) );
        }

        return new Promise<CategoryType>((_resolve, reject) => reject(null));
    }
}
