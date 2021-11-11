import { IMessage } from "../../../Interfaces/Message";

export interface IMessageItemProps  {
    message : IMessage,
    showMessageMore : (messageId : string) => void;
    deleteMessage: (messageId : string) => void;
    handleMessageReaded : (messageId : string) => void;
}