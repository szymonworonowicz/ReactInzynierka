import React from "react";
import { IAddress } from "../../../../Interfaces/user";
import { IDataComponentProps } from "../../../../Interfaces/IDataComponentProps";
import {Grid, makeStyles, Typography} from '@material-ui/core'
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
    header:{
        marginBottom:'20px'
    }
})
const AuctionConfirmationUserAddress : React.FC<IDataComponentProps<IAddress | undefined>> = ({data}) => {

    const {t} = useTranslation();
    const classes = useStyles();
    
    if(!data) {
        return null;
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant='h5'>{t('selectedAddress')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5'>{data.street} {data.houseNo}</Typography>                 
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5'>{data.postCode} {data.city}</Typography>                 
                </Grid>
                
            </Grid>
        </>
    )

}

export default AuctionConfirmationUserAddress;