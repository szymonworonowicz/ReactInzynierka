import React, { useState } from "react";
import { IAuctionListElementProps } from "./IAuctionListElementProps";
import { Paper, Container, Typography } from "@material-ui/core";
import moment from 'moment';

const AuctionListElement: React.FC<IAuctionListElementProps> = ({ data }) => {
    const [remainingTime, setRemainingTime] = useState<number>((data.timeStampEnd as number) - (new Date().getTime() /1000));

//   setInterval(() => {
//       debugger;
//     setRemainingTime(prev => prev -1);
//     console.log(getEndTime())
//   },1000)

//   const getEndTime = ()=> {
//       return moment.duration(remainingTime,'seconds')
//   }
  return (
    <Paper>
      <Container style={{ display: "flex" }} maxWidth={false}>
        <div>
          <img
            src="https://via.placeholder.com/150"
            alt=""
            width="150px"
            height="150px"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Typography variant="h6" align="center">
            {" "}
            {data.title}
          </Typography>
          <p>{data.description}</p>
          <p
            style={{
              position: "absolute",
              bottom: "3px",
              right: "3px"
            }}
          >
            {data.price}
          </p>
          <p></p>
        </div>
      </Container>
    </Paper>
  );
};

export default AuctionListElement;
