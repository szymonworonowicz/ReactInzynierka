import React,{useState} from "react";
import {IImageCropModalProps} from './IImageCropModalProps';
import ImageCropModalFooter from './ImageCropModalFooter/ImageCropModalFooter';
import ImageCrop from './ImageCrop/ImageCrop'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root : {
        width: '60vw',
        height: '60vh',
        position:'relative'
    },
    footer: {
        position:'absolute',
        bottom:'0px',
        width:'100%',
        '& .MuiMobileStepper-root': {
            backgroundColor:'white'
        }
    }, 
    content: {

    }
})

const ImageCropModal: React.FC<IImageCropModalProps> = ({images, setImages}) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <ImageCrop currentImage={images[currentStep]} setImages={setImages} currentStep= {currentStep}/>
            </div>
            <div className={classes.footer}>
                <ImageCropModalFooter currentStep={currentStep} setCurrentStep={setCurrentStep} steps={images.length}/>
            </div>
        </div>
    )
}

export default ImageCropModal