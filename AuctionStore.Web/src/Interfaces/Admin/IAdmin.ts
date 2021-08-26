export interface IAdmin {
    id : string;
    userName : string;
    firstName : string;
    lastName : string;
    email : string;
    isDisabled : boolean;
    isDeleted : boolean;
    CreatedDateUtc : string;
    LastLoginDateUtc : string;
}