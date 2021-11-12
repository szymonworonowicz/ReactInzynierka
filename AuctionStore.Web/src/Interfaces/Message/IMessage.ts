export interface IMessage {
    id : string;
    text : string;
    added : number;
    from? : string;
    isReaded : boolean;
}