import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";


const AuctionDeliveryConfirmation : React.FC = () => {

    const {getValues} = useFormContext();

    console.log(getValues());
    return (
        <>
        </>
    )
}

export default AuctionDeliveryConfirmation;