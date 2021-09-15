import { FileObject } from "material-ui-dropzone";

export interface IImageElementProps {
    file: FileObject;
    onDelete :(file: FileObject) =>  Promise<void>,
    onSetMainPhoto : (file: FileObject) => void;
    onDeleteMainPhoto : (file: FileObject) => void;
    selectedPhoto : string;
}