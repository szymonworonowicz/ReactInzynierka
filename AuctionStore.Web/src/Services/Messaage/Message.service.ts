import { MessageType, SendMessageType } from "../../Types/Messages";
import { apiClient } from "../APIClient/apiClient";
import { IBaseResponse } from "../../Interfaces/Api";
import { PageRequestType, PageResponseType } from "../../Types/Paged";
import { UpdateMessageStateType } from "../../Types/Messages";

interface IMessageService {
  getMessages: (
    page: PageRequestType,
    userId: string
  ) => Promise<PageResponseType<MessageType>>;
  deleteMessage: (messageId: string) => Promise<boolean>;
  sendMessage: (message: SendMessageType) => Promise<boolean>;
  setMessageState: (messages: UpdateMessageStateType[]) => Promise<boolean>;
}

export const MessageService: IMessageService = {
  getMessages: async (
    page: PageRequestType,
    userId: string
  ): Promise<PageResponseType<MessageType>> => {
    const response = await apiClient.post<
      IBaseResponse<PageResponseType<MessageType>>
    >("/messages", { ...page, userId });

    if (response.data.success) {
      return new Promise<PageResponseType<MessageType>>((resolve) =>
        resolve(response.data.data)
      );
    }

    return new Promise<PageResponseType<MessageType>>((_resolve, reject) =>
      reject(null)
    );
  },

  deleteMessage: async (messageId: string): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "/messages/delete",
      { messageId }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(true));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },

  sendMessage: async (message: SendMessageType): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "/messages/sendMessage",
      message
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(true));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },

  setMessageState: async (
    messages: UpdateMessageStateType[]
  ): Promise<boolean> => {
    const response = await apiClient.post<IBaseResponse<any>>(
      "/messages/setMessageState",
      { messages }
    );

    if (response.data.success) {
      return new Promise<boolean>((resolve) => resolve(true));
    }

    return new Promise<boolean>((_resolve, reject) => reject(null));
  },
};
