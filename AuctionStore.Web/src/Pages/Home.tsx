import { makeStyles } from "@material-ui/styles";
import React from "react";
import NewestAuctions from '../Components/Auction/HomePageAuctions/NewestAuctions/NewestAuctions';
import TrendingAuctions from '../Components/Auction/HomePageAuctions/TrendingAuctions/TrendingAuctions';

const useStyles = makeStyles({
    root: {
        display:'flex',
        flexDirection:'column',
        height:'100%',
        justifyContent:'center'
    }
})
const Home : React.FC = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NewestAuctions />
            <TrendingAuctions />
        </div>
    )
}

export default Home;