import React from 'react';
import { FileObject } from "material-ui-dropzone";

export interface IImageCropProps {
    currentImage : FileObject,
    setImages: React.Dispatch<React.SetStateAction<FileObject[]>>;
    currentStep : number;
}