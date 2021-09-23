import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root:{
        // position: 'absolute',
        // border: '1px solid red',
        // width: '100%',
        // bottom: '0px',
        // height: '10vh',
    }
})

const Footer : React.FC = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>

        </div>
    )
}

export default Footer;