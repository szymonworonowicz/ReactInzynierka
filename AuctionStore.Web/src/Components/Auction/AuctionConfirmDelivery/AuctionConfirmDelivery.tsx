import React, { useState } from "react";
import { IAuctionConfirmDeliveryProps } from "./IAuctionConfirmDeliveryProps";
import AuctionConfirmDeliveryAddress from "./AuctionConfirmDeliveryAddress/AuctionConfirmDeliveryAddress";
import AuctionConfirmDeliveryCompany from "./AuctionConfirmDeliveryCompany/AuctionConfirmDeliveryCompany";

const AuctionConfirmDelivery: React.FC<IAuctionConfirmDeliveryProps> = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Warsaw");

  return (
    <>
      <AuctionConfirmDeliveryAddress setSelectedCity={setSelectedCity} />
      <AuctionConfirmDeliveryCompany city={selectedCity} />
    </>
  );
};

export default AuctionConfirmDelivery;
