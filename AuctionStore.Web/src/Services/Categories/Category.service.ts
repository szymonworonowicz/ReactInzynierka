import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import { AddCategoryType } from "../../Types/Category/";
import { CategoryListType } from "../../Types/Category/";

export const CategoriesApi = {
  getAll: async (): Promise<CategoryListType[]> => {
    const response = await apiClient.get<IBaseResponse<CategoryListType[]>>(
      "/categorys"
    );

    if (response.data.success) {
      return new Promise<CategoryListType[]>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<CategoryListType[]>((_resolve, reject) => reject(null));
  },
  deleteCategory: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      `/categorys/deleteCategory`,
      { id }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  deleteSubCategory: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      `/categorys/deleteSubCategory`,
      { id }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(response.data.success));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
  getCategories: async (): Promise<Array<AddCategoryType>> => {
    const response = await apiClient.get<IBaseResponse<AddCategoryType[]>>(
      "/categorys/getCategories"
    );

    if (response.data.success) {
      return new Promise<AddCategoryType[]>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<AddCategoryType[]>((_resolve, reject) => reject(null));
  },
  AddCategory: async (data: AddCategoryType): Promise<CategoryListType> => {
    const response = await apiClient.post<IBaseResponse<CategoryListType>>(
      "/categorys/AddCategory",
      data
    );

    if (response.data.success) {
      return new Promise<CategoryListType>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<CategoryListType>((_resolve, reject) => reject(null));
  },
};
