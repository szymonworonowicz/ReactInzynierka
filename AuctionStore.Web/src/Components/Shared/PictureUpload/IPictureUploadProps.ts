import { IStoreFileConfig } from "./Interfaces";
import { Dispatch, SetStateAction } from "react";
import {AuctionPhotoType} from '../../../Types/Auction'

export interface IPictureUploadProps {
    fileEntity? : Array<AuctionPhotoType>;
    setFileEntity : Dispatch<SetStateAction<Array<AuctionPhotoType>>>;
    storeFileConfig : IStoreFileConfig
}