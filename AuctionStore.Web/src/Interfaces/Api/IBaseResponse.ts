export interface IBaseResponse<T> {
    success : boolean,
    data: T,
    errors: Array<any>
}