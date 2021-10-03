import {IPageResponse, IPageRequest} from '../../../Interfaces/Paged'

export interface IUsePagedProps<T,> {
    apiCall : (query: IPageRequest ,...params : any[]) => Promise<IPageResponse<T>>;
    query : IPageRequest;
}