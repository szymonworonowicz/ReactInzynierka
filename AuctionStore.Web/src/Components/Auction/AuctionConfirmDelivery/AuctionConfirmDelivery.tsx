import React, { useState } from "react";
import AuctionConfirmDeliveryAddress from "./AuctionConfirmDeliveryAddress/AuctionConfirmDeliveryAddress";
import AuctionConfirmDeliveryCompany from "./AuctionConfirmDeliveryCompany/AuctionConfirmDeliveryCompany";

const AuctionConfirmDelivery: React.FC= () => {
  const [selectedCity, setSelectedCity] = useState<string>("Warsaw");

  return (
    <>
      <AuctionConfirmDeliveryAddress setSelectedCity={setSelectedCity} />
      <AuctionConfirmDeliveryCompany city={selectedCity} />
    </>
  );
};

export default AuctionConfirmDelivery;
