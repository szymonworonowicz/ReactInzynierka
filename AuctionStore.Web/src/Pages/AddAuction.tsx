import React from "react";
import AuctionAdd from '../Components/AuctionAdd/AddAuction';
import Header from '../Components/Shared/Header/Header';
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      position: "absolute",
      left: "10%",
      top:'10%',
      width: "80%",
      flexGrow: 1,
      flexDirection: "row",
    },
  });
  
const AddAuction: React.FC = () => {

    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <div className={classes.root}>
            <Header  header={t('add_auction')}/>
            <AuctionAdd />
        </div>
    )
}

export default AddAuction;