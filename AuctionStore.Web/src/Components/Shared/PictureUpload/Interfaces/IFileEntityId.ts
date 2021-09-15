import { FileObject } from "material-ui-dropzone";

export interface IFileEntityId {
    id : string;
    file : FileObject,
    isMain? : boolean;
}