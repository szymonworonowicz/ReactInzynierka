export interface IPageResponse<T> {
    countOfElements : number;
    maxPage : number;
    pageElements : Array<T>
}