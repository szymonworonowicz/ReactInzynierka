import React, { useState, useCallback } from "react";
import { IImageCropProps } from "./IImageCropProps";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { makeStyles } from "@material-ui/core";
import ImageCropFooter from './ImageCropFooter/ImageCropFooter';
import getCroppedImg from './cropImage';

const useStyles = makeStyles({
    root:{
        height: '100%',
    }, 
    content : {
        height:'84%'
    },
    footer :{
        position: 'absolute',
        bottom: '10%',
        padding: '0px 10px',
        width: '80%',
        left:'10%',
        display:'flex'
    }
})

const ImageCrop: React.FC<IImageCropProps> = ({ currentImage, setImages, currentStep }) => {
  const [crop, setCrop] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  
  const classes = useStyles();

  const onCropComplete = useCallback(
      async (croppedArea :Area, croppedAreaPixels : Area) => {
          setCroppedAreaPixels(croppedAreaPixels);
          const croppedImage = await getCroppedImg(
            currentImage.data,
            croppedAreaPixels as Area
          )
          console.log(typeof croppedImage)
          debugger;
          // setImages(prev => {
          //   const local = prev;
          //   local.splice(currentStep, 1, {
          //     data : croppedImage,
          //     file: currentImage.file
          //   });

          //   return [...local]
          // })
      }
  ,[currentImage.data])

  const handleCropChange= (location: Point) => {
    setCrop(location);
  }

  const handleChangeZoom = (zoom: number) => {
      setZoom(zoom);
      showCroppedImage()
  }
  const showCroppedImage = useCallback(async () => {
    debugger;
    try {
      const croppedImage = await getCroppedImg(
        currentImage.data,
        croppedAreaPixels as Area
      )

      setImages(prev => {
        const local = prev;
        local.splice(currentStep, 1, {
          data : croppedImage,
          file: currentImage.file
        });

        return [...local]
      })
      console.log('donee', { croppedImage })
    } catch (e) {
      console.error(e)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels])

  return (
      <div className={classes.root}>
          <div>
            <Cropper 
                classes={{containerClassName: classes.content}}
                image={currentImage.data as string}
                crop={crop}
                zoom={zoom}
                aspect={1/1}
                onCropChange={handleCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={handleChangeZoom}
            />
          </div>
          <div className={classes.footer}>
            <ImageCropFooter  zoom={zoom} setZoom={setZoom}/>
          </div>
      </div>
  )
};

export default ImageCrop;
