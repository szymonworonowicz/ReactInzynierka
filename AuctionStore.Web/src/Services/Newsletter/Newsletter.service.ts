import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import { NewsletterInfoType } from "../../Types/Newsletter";

interface INewsletterService {
  sendNewsletter: (data: NewsletterInfoType) => Promise<boolean>;
}

export const NewsletterService: INewsletterService = {
  sendNewsletter: async (data: NewsletterInfoType): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "/newsletters/addNewsletter",
      data
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(true));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
};
