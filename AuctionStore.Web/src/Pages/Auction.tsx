import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AuctionPhotos from "../Components/Auction/AuctionPhotos/AuctionPhotos";
import AuctionDetails from "../Components/Auction/AuctionDetails/AuctionDetails";

type AuctionDefailsRouteInfo = {
  id: string;
};
interface IAuctionDetailsProps
  extends RouteComponentProps<AuctionDefailsRouteInfo> {}

const Auction: React.FC<IAuctionDetailsProps> = ({ match }) => {
  const { id } = match.params;
  return (
    <>
      <AuctionPhotos id={id} />
      <AuctionDetails id={id} />
    </>
  );
};

export default withRouter(Auction);
