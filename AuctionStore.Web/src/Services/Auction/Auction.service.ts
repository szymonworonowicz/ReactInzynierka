import {apiClient} from '../APIClient/apiClient';
import {IAddAuction, IAuction, IAuctionDetails, IAuctionInfo} from '../../Interfaces/Auctions';
import {  IBaseResponse } from '../../Interfaces/Api';
import { IPageRequest, IPageResponse } from "../../Interfaces/Paged";


export const AuctionApi = {
    getAllByCategory : async (categoryId : string, data :IPageRequest) : Promise<IPageResponse<IAuction>>  => {
        const response = await apiClient.post<IBaseResponse<IPageResponse<IAuction>>>('auctions/',{categoryId, ...data});

        if (response.data.success) {
            return new Promise<IPageResponse<IAuction>>((resolve) =>
              resolve(response.data.data)
            );
          }
      
          return new Promise<IPageResponse<IAuction>>((_resolve, reject) =>
            reject(null)
          );
    },

    getAuctionInfo : async () : Promise<IAuctionInfo> => {
      const response = await apiClient.get<IBaseResponse<IAuctionInfo>>('auctions/auctionInfo');

      if (response.data.success) {
          return new Promise<IAuctionInfo>((resolve) =>
            resolve(response.data.data)
          );
        }
    
        return new Promise<IAuctionInfo>((_resolve, reject) =>
          reject(null)
        );
    },

    addAuction : async(data : IAddAuction) : Promise<boolean> => {
      const response =  await apiClient.post<IBaseResponse<any>>('/auctions/addAuction', data);

      if (response.data.success) {
        return new Promise<boolean>((resolve) =>
          resolve(response.data.success)
        );
      }
  
      return new Promise<boolean>((_resolve, reject) =>
        reject(null)
      );
    },

    getAuction: async(auctionId : string) :Promise<IAuctionDetails> => {
      const response = await apiClient.post<IBaseResponse<IAuctionDetails>>('/auctions/getAuction', {auctionId});

      if(response.data.success) {
        return new Promise<IAuctionDetails>((resolve) => {
          resolve(response.data.data);
        })
      }

      return new Promise<IAuctionDetails>((_resolve,reject) => {
        reject(null);
      })
    },

    deleteAuction: async(auctionId : string)  :Promise<boolean> => {
      const response =  await apiClient.post<IBaseResponse<any>>('/auctions/deleteAuction', {auctionId});

      if (response.data.success) {
        return new Promise<boolean>((resolve) =>
          resolve(response.data.success)
        );
      }
  
      return new Promise<boolean>((_resolve, reject) =>
        reject(null)
      );
    },

    getUserAuction : async(userId : string, isWinning : boolean, data : IPageRequest) : Promise<IPageResponse<IAuction>>  => {
      const response = await apiClient.post<IBaseResponse<IPageResponse<IAuction>>>('/auctions/userAuction',{userId, isWinning,...data});

      if (response.data.success) {
          return new Promise<IPageResponse<IAuction>>((resolve) =>
            resolve(response.data.data)
          );
        }
    
        return new Promise<IPageResponse<IAuction>>((_resolve, reject) =>
          reject(null)
        );
  },
}