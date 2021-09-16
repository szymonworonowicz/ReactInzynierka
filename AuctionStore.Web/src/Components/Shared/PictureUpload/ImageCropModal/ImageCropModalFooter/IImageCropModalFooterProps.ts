import React from "react";

export interface IImageCropModalFooterProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  steps : number;
}
