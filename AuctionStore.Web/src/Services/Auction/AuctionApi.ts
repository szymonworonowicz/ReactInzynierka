import {apiClient} from '../APIClient/apiClient';
import {IAuction} from '../../Interfaces/Auctions';
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
    }
}