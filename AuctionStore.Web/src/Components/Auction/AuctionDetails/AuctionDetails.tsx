import React, { useState, useEffect } from "react";
import { IAuctionDetailsProps } from "./IAuctionDetailsProps";
import { AuctionApi } from "../../../Services/Auction/Auction.service";
import { IAuctionDetails } from "../../../Interfaces/Auctions";
import AuctionDetailsContent from "./AuctionDetailsContent/AuctionDetailsContent";
import AuctionDetailsHeader from "./AuctionDetailsHeader/AuctionDetailsHeader";
import AuctionMessage from "./AuctionMessage/AuctionMessage";
import { CircularProgress } from "@material-ui/core";

const AuctionDetails: React.FC<IAuctionDetailsProps> = ({ id }) => {
  const [auction, setAuction] = useState<IAuctionDetails>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await AuctionApi.getAuction(id);
      setAuction(response);
      setIsLoaded(true);
    })();
  }, [id]);

  if (!isLoaded) {
    return <CircularProgress />;
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
