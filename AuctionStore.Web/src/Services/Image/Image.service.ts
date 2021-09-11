import { IBaseResponse } from "../../Interfaces/Api";
import { IImage } from "../../Interfaces/Image";
import {apiClient} from '../APIClient/apiClient';

export interface IImageService {
    saveImage: (file : File) => Promise<IImage>,
    deleteImage: (id:string) => Promise<boolean> 
}

export const ImageService : IImageService = {
    saveImage: async (file: File): Promise<IImage> => {
        let form = new FormData();
        form.append('file', file, file.name);
        const response = await apiClient.post<IBaseResponse<IImage>>('/files/addImage', form);

        if (response.data.success) {
            return new Promise((resolve) => resolve(response.data.data));
        }
        return new Promise((_resolve, reject) => reject(null));
    },
    deleteImage: async (id: string): Promise<boolean>  => {
        const response = await apiClient.post<IBaseResponse<any>>('/files/deleteImage',{imageId : id})
        if(response.data.success) {
            return new Promise<boolean>((resolve) => resolve(true));
        }

        return new Promise<boolean>((_resolve, reject) => reject(null));
    }
}