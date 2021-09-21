import React from "react";
import {ILargePhotoProps} from './ILargePhotoProps';
import { makeStyles } from "@material-ui/styles";

const useStyles= makeStyles({
    root:{
        width:'60vw',
        height:'60vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    img : {
        height:'60vh',
        width:'auto'
    }
})

const LargePhoto : React.FC<ILargePhotoProps>  = ({photo}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img alt='' src={photo} className={classes.img}/>
        </div>
    )
}

export default LargePhoto;