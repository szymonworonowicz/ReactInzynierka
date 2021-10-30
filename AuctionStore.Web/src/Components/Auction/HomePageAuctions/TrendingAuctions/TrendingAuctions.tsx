import React from "react";
import { IAuction } from "../../../../Interfaces/Auctions";
import {CircularProgress, Grid, makeStyles, Typography} from '@material-ui/core'
import { AuctionApi } from "../../../../Services/Auction/Auction.service";
import { useTranslation } from "react-i18next";
import HomePageAuctionContainer from '../HomePageAuctionContainer/HomePageAuctionContainer';

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
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const {t} = useTranslation();

    const classes = useStyles();
    React.useEffect(() => {
        setIsLoaded(false);
        AuctionApi.getTrendingAuctions()
            .then(response => {
                setAuctions(response);
            })
            .catch(() => {
                alert('error')
            })
            .finally(() => {
                setIsLoaded(true);
            })
    },[])

    if (!isLoaded ) {
        return <CircularProgress />;
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