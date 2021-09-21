import { IBaseResponse } from "../../Interfaces/Api";
import { IAuctionImage, IImage } from "../../Interfaces/Image";
import {apiClient} from '../APIClient/apiClient';

export interface IImageService {
    saveImage: (file : File) => Promise<IImage>,
    deleteImage: (id:string) => Promise<boolean>,
    getMainImage: (auctionId : string) => Promise<string>,
    getAuctionImages:(auctionId : string) => Promise<Array<IAuctionImage>>
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
    },

    getMainImage : async (auctionId : string): Promise<string> => {
        const response = await apiClient.post<IBaseResponse<string>>('/files/getAuctionMainImage',{auctionId});
        
        if(response.data.success) {
            return new Promise<string>((resolve) => resolve(response.data.data));
        }

        return new Promise<string>((_response, reject) => reject(null));
    },

    getAuctionImages : async (auctionId: string):Promise<Array<IAuctionImage>> => {
        const response = await apiClient.post<IBaseResponse<Array<IAuctionImage>>>('/files/getAuctionImages', {auctionId});

        if(response.data.success) {
            return new Promise<Array<IAuctionImage>>((resolve) => resolve(response.data.data));
        } 
        return new Promise<Array<IAuctionImage>>((_resolve,reject) => reject(null));
    }
}