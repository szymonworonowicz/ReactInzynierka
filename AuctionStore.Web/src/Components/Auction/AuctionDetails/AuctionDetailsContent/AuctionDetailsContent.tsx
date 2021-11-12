import React from "react";
import {IAuctionDetailsContentProps} from '../../../../Interfaces/Auction/'
import {Paper} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"; 

const useStyles = makeStyles({
    root:{
        padding:'10px',
        marginTop:'5vh'
    },
    paragraph:{
        wordBreak:'break-all',
        padding:'0.3rem'
    }
})

const AuctionDetailsContent: React.FC<IAuctionDetailsContentProps> = ({description}) => {

    const classes = useStyles();
    return (
        <Paper>
            <div className={classes.root}>
                <p className={classes.paragraph}>
                    {description}
                </p>
            </div>
        </Paper>
        
    )
}

export default AuctionDetailsContent;