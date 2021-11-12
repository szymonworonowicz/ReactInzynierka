import React from "react";
import { Backdrop,makeStyles, CircularProgress } from "@material-ui/core";
import  {ILoaderProps} from './ILoaderProps';

const useStyles = makeStyles({
    backdrop: {
        zIndex: 1400,
    }
});

const Loader : React.FC<ILoaderProps> =({isOpen}) => {

    const classes = useStyles();

    return (
      <Backdrop open={isOpen} className={classes.backdrop}>
          <CircularProgress color='primary'/>
      </Backdrop>

    )
}

export default Loader;