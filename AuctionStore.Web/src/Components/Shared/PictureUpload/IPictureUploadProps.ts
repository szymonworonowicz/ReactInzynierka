import { IFileEntity, IStoreFileConfig } from "./Interfaces";
import { Dispatch, SetStateAction } from "react";

export interface IPictureUploadProps {
    fileEntity? : Array<IFileEntity>;
    setFileEntity : Dispatch<SetStateAction<Array<IFileEntity>>>;
    storeFileConfig : IStoreFileConfig
}