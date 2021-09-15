import { IStoreFileConfig } from "./Interfaces";
import { Dispatch, SetStateAction } from "react";
import {IAuctionPhoto} from '../../../Interfaces/Auctions'

export interface IPictureUploadProps {
    fileEntity? : Array<IAuctionPhoto>;
    setFileEntity : Dispatch<SetStateAction<Array<IAuctionPhoto>>>;
    storeFileConfig : IStoreFileConfig
}