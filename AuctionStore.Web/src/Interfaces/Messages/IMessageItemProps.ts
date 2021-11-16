import { MessageType } from "../../Types/Messages/";

export interface IMessageItemProps  {
    message : MessageType,
    showMessageMore : (messageId : string) => void;
    deleteMessage: (messageId : string) => void;
    handleMessageReaded : (messageId : string) => void;
}