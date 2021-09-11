import React from "react";
import {IImageElementProps} from './IImageElementProps';
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    main: {
        position:'relative'
    },
    icon : {
        position:'absolute',
        top:'2%',
        right:'5%',
        width:'20px',
        height:'auto',
    },
    pictureThumbnail: {
        display: "inline-grid",
        maxWidth: "150px",
        maxHeight: "90px",
        justifyContent: "center",
        alignContent: "center",
    
        padding: "10px",
      },
}));

const ImageElement : React.FC<IImageElementProps> = ({fileId, onDelete,fileUrl}) => {

    const classes = useStyles();

    const handleOnDelete = () => {
        onDelete(fileId);
    }
    return (
        <div className={classes.main}>
            <img src={fileUrl} alt="" className={classes.pictureThumbnail}/>
            <IconButton className={classes.icon} onClick={handleOnDelete}>
                <Close style={{color:'red'}}/>
            </IconButton>
        </div>
    )
}

export default ImageElement;