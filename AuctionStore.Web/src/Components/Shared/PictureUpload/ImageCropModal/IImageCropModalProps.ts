import { FileObject } from "material-ui-dropzone";
import React from "react";

export interface IImageCropModalProps {
  images: Array<FileObject>;
  setImages: React.Dispatch<React.SetStateAction<Array<FileObject>>>;
}
