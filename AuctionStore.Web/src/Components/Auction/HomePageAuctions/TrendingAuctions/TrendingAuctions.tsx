import React from "react";
import { IAuction } from "../../../../Interfaces/Auctions";
import {Grid, makeStyles, Typography} from '@material-ui/core'
import { AuctionApi } from "../../../../Services/Auction/Auction.service";
import { useTranslation } from "react-i18next";
import HomePageAuctionContainer from '../HomePageAuctionContainer/HomePageAuctionContainer';
import { LottieContext } from "../../../../Context/LottieContext";

const useStyles = makeStyles({
    root:{
        marginTop:'20px',
    },
    content: {
        display:'flex',
        flexDirection : 'column'
    }
})

const TrendingAuctions : React.FC = () => {
    const [auctions, setAuctions ] = React.useState<Array<IAuction>>([]);
    const {isOpen, setLottieOpen} = React.useContext(LottieContext);    
    const {t} = useTranslation();

    const classes = useStyles();
    React.useEffect(() => {
        setLottieOpen(true);
        AuctionApi.getTrendingAuctions()
            .then(response => {
                setAuctions(response);
            })
            .catch(() => {
                alert('error')
            })
            .finally(() => {
                setLottieOpen(false);
            })
    },[setLottieOpen])

    if (isOpen) {
        return <></>
      }

    return (
        <div className={classes.root}>
        <Grid container spacing={1} className={classes.content}>
            <Grid item >
                <Typography variant='h5'>{t('trendingAuctions')}</Typography>
            </Grid>
            <HomePageAuctionContainer data={auctions}/>
        </Grid>
    </div>
    )
}

export default TrendingAuctions;