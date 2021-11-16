export type MessageType = {
    id : string;
    text : string;
    added : number;
    from? : string;
    isReaded : boolean;
}