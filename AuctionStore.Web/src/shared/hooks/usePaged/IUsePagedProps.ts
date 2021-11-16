import {PageResponseType, PageRequestType} from '../../../Types/Paged'

export interface IUsePagedProps<T,> {
    apiCall : (query: PageRequestType ,...params : any[]) => Promise<PageResponseType<T>>;
    query : PageRequestType;
}