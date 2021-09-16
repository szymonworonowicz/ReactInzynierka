import React from "react";
import { IImageCropFooterProps } from "./IImageCropFooterProps";
import { Slider } from "@material-ui/core";

const ImageCropFooter : React.FC<IImageCropFooterProps> = ({setZoom, zoom}) => {

    const handleChangeZoom = (_e:React.ChangeEvent<{}>, value : number | Array<number>) => {
        setZoom(Number(value));
    }

    return (
        <Slider 
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={handleChangeZoom}
        />
    )
}

export default ImageCropFooter;