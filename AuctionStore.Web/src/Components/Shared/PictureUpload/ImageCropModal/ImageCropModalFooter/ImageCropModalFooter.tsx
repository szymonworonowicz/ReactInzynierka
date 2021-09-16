import React from "react";
import {IImageCropModalFooterProps} from './IImageCropModalFooterProps';
import {MobileStepper, Button} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import { useTranslation } from "react-i18next";

const ImageCropModalFooter : React.FC<IImageCropModalFooterProps> = ({currentStep, setCurrentStep, steps}) => {

    const {t} = useTranslation();

    const handleNext = () => {
        setCurrentStep(prev => prev +1);
    }

    const handlePrev = () => {
        setCurrentStep(prev => prev -1)
    }

    return (
        <MobileStepper 
            variant="progress"
            steps={steps}
            position="static"
            activeStep={currentStep}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={currentStep === steps -1}>
                    {t('next')}
                    <KeyboardArrowRight/>
                </Button>
            }
            backButton={
                <Button size="small" onClick={handlePrev} disabled={currentStep === 0}>
                    {t('prev')}
                    <KeyboardArrowLeft/>
                </Button>
            }
        />
    )
}
export default ImageCropModalFooter;