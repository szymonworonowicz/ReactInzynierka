import React from "react";
import NewestAuctions from '../Components/Auction/HomePageAuctions/NewestAuctions/NewestAuctions';
import TrendingAuctions from '../Components/Auction/HomePageAuctions/TrendingAuctions/TrendingAuctions';

const Home : React.FC = () => {

    return (
        <div>
            <NewestAuctions />
            <TrendingAuctions />
        </div>
    )
}

export default Home;