import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import dotpay from "../../../Logos/dotpay.jpg";
import wallet from "../../../Logos/wallet.png";

const useStyles = makeStyles({
  root: {},
  selected: {
    border: "1px solid red",
  },
  photo: {
    height: "100px",
    width: "100px",
  },
  firstOpt: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const AuctionConfirmPayment: React.FC = () => {
  const { setValue, getValues } = useFormContext();

  const [selectedOption, setSelectedOption] = useState<number>(
    getValues()["selectedPayment"] ?? 1
  );

  const classes = useStyles();

  const handleOptionClick = (elem: number)  => {
    setSelectedOption(elem);
    setValue("selectedPayment", elem);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={6} className={classes.firstOpt}>
          <Button onClick={() => handleOptionClick(1)}>
            <img
              className={clsx({
                [classes.photo]: true,
                [classes.selected]: selectedOption === 1,
              })}
              alt="inpost"
              src={dotpay}
              height=""
              width=""
            ></img>
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button onClick={() => handleOptionClick(2)}>
            <img
              className={clsx({
                [classes.photo]: true,
                [classes.selected]: selectedOption === 2,
              })}
              alt="inpost"
              src={wallet}
              height=""
              width=""
            ></img>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuctionConfirmPayment;
