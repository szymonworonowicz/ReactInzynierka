import React from "react";
import { IDataComponentProps } from "../../../IDataComponentProps";
import { IAuction } from "../../../../Interfaces/Auctions";
import { Grid, makeStyles } from "@material-ui/core";
import HomePageAuctionElement from "./HomePageAuctionElement";

const useStyles = makeStyles({
  root: {
    width: "80vw",
    display: "flex",
    marginTop: "4rem",
  },
});

const HomePageAuctionContainer: React.FC<IDataComponentProps<Array<IAuction>>> =
  ({ data }) => {
    const classes = useStyles();
    return (
      <div>
        <Grid container spacing={1} className={classes.root}>
          <Grid item xs={3} />
          {data.map((elem, key) => {
            return (
              <Grid item xs={2} key={key}>
                <HomePageAuctionElement  data={elem} />
              </Grid>
            );
          })}
          <Grid item xs={3} />
        </Grid>
      </div>
    );
  };

export default HomePageAuctionContainer;
