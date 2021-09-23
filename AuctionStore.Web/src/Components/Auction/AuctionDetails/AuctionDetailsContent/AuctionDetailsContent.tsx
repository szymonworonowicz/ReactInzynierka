import React from "react";
import {IAuctionDetailsContentProps} from './IAuctionDetailsContentProps'
import {Paper} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"; 

const useStyles = makeStyles({
    root:{
        padding:'10px',
        marginTop:'5vh'
    }
})

const AuctionDetailsContent: React.FC<IAuctionDetailsContentProps> = ({description}) => {

    const classes = useStyles();
    return (
        <Paper>
            <div className={classes.root}>
                <p>
                    {description}
                </p>
            </div>
        </Paper>
        
    )
}

export default AuctionDetailsContent;