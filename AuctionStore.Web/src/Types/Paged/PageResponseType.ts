export type PageResponseType<T> ={
    countOfElements : number;
    maxPage : number;
    pageElements : Array<T>
}