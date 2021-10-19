import React, { useState } from "react";
import { IAuctionConfirmDeliveryProps } from "./IAuctionConfirmDeliveryProps";
import AuctionConfirmDeliveryAddress from "./AuctionConfirmDeliveryAddress/AuctionConfirmDeliveryAddress";
import AuctionConfirmDeliveryCompany from "./AuctionConfirmDeliveryCompany/AuctionConfirmDeliveryCompany";
import { useForm, FormProvider } from "react-hook-form";

const AuctionConfirmDelivery: React.FC<IAuctionConfirmDeliveryProps> = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Warsaw");

  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <AuctionConfirmDeliveryAddress setSelectedCity={setSelectedCity} />
        <AuctionConfirmDeliveryCompany city={selectedCity} />
      </FormProvider>
    </>
  );
};

export default AuctionConfirmDelivery;
