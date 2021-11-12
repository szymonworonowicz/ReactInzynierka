import React, { useState, useEffect } from "react";
import { IAuctionDetailsProps } from "../../../Interfaces/Auction/";
import { AuctionApi } from "../../../Services/Auction/Auction.service";
import { IAuctionDetails } from "../../../Interfaces/Auctions";
import AuctionDetailsContent from "./AuctionDetailsContent/AuctionDetailsContent";
import AuctionDetailsHeader from "./AuctionDetailsHeader/AuctionDetailsHeader";
import AuctionMessage from "./AuctionMessage/AuctionMessage";
import { LottieContext } from "../../../Context/LottieContext";

const AuctionDetails: React.FC<IAuctionDetailsProps> = ({ id }) => {
  const [auction, setAuction] = useState<IAuctionDetails>();
  const { isOpen, setLottieOpen } = React.useContext(LottieContext);

  useEffect(() => {
    setLottieOpen(true);
    AuctionApi.getAuction(id)
      .then((response) => {
        setAuction(response);
      })
      .finally(() => {
        setLottieOpen(false);
      });
  }, [id, setLottieOpen]);

  if (isOpen || !auction) {
    return <></>
  }
  return (
    <div>
      <AuctionDetailsHeader
        data={auction as Omit<IAuctionDetails, "description">}
      />
      <AuctionDetailsContent description={auction?.description ?? ""} />

      <AuctionMessage auctionId={id} />
    </div>
  );
};

export default AuctionDetails;
