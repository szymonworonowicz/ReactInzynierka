import {apiClient} from '../APIClient/apiClient';
import {IAddAuction, IAuction, IAuctionDetails, IAuctionInfo, IAuctionConfirmationForm, IAuctionConfirmResult} from '../../Interfaces/Auctions';
import {  IBaseResponse } from '../../Interfaces/Api';
import { PageRequestType, PageResponseType } from "../../Types/Paged";


export const AuctionApi = {
    getAllByCategory : async ( data :PageRequestType,categoryId : string) : Promise<PageResponseType<IAuction>>  => {
        const response = await apiClient.post<IBaseResponse<PageResponseType<IAuction>>>('auctions/',{categoryId, ...data});

        if (response.data.success) {
            return new Promise<PageResponseType<IAuction>>((resolve) =>
              resolve(response.data.data)
            );
          }
      
          return new Promise<PageResponseType<IAuction>>((_resolve, reject) =>
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

    getUserAuction : async(data : PageRequestType, userId : string, isWinning : boolean) : Promise<PageResponseType<IAuction>>  => {
      const response = await apiClient.post<IBaseResponse<PageResponseType<IAuction>>>('/auctions/userAuction',{userId, isWinning,...data});

      if (response.data.success) {
          return new Promise<PageResponseType<IAuction>>((resolve) =>
            resolve(response.data.data)
          );
        }
    
        return new Promise<PageResponseType<IAuction>>((_resolve, reject) =>
          reject(null)
        );
  },
  checkWrongWord : async(description : string, title:  string) :Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<boolean>>('/auctions/checkBadWords',{title, description});

    if(response.data.data) {
      return new Promise<boolean>((resolve) =>
          resolve(response.data.success)
        );
    }

    return new Promise<boolean>((_resolve, reject) =>
        reject(null)
      );
  }
  ,
  getNewestAuctions : async() :Promise<Array<IAuction>> => {
    const response = await apiClient.get<IBaseResponse<Array<IAuction>>>('/auctions/getNewestAuctions');

    if(response.data.success) {
      return new Promise<Array<IAuction>>((resolve) =>
          resolve(response.data.data)
        );
    }

    return new Promise<Array<IAuction>>((_resolve, reject) =>
        reject(null)
      );
  },
  getTrendingAuctions : async() : Promise<Array<IAuction>> => {
    const response = await apiClient.get<IBaseResponse<Array<IAuction>>>('/auctions/getTrendingAuctions');

    if(response.data.success) {
      return new Promise<Array<IAuction>>((resolve) =>
          resolve(response.data.data)
        );
    }

    return new Promise<Array<IAuction>>((_resolve, reject) =>
        reject(null)
      );
  },
  confirmAuction : async(data :IAuctionConfirmationForm, winningUserId : string | null) : Promise<IAuctionConfirmResult> => {
    const response = await apiClient.post<IBaseResponse<IAuctionConfirmResult>>('/auctions/confirmAuctionDelivery',{...data, winningUserId});

    if(response.data.success) {
      return new Promise<IAuctionConfirmResult>((resolve) =>
          resolve(response.data.data)
        );
    }

    return new Promise<IAuctionConfirmResult>((_resolve, reject) =>
        reject(null)
      );
  }
  
}