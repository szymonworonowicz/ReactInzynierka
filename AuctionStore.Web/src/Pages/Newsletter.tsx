import React from "react";  
import NewsletterForm from '../Components/Newsletter/Newsletter';

import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    root: {

        height:'100%',
        position:'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        width:'40%'
    }
})

const Newsletter : React.FC = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <NewsletterForm/>
            </div>
        </div>
        
    )
}

export default Newsletter;