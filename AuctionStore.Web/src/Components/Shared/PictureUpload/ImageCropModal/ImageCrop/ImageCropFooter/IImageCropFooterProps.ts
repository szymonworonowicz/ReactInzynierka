import React from "react";

export interface IImageCropFooterProps {
    setZoom : React.Dispatch<React.SetStateAction<number>>;
    zoom : number;
}