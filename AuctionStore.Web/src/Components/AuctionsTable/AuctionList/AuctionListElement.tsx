import React, { useState,useEffect } from "react";
import { IAuctionListElementProps } from "./IAuctionListElementProps";
import { Paper, Container, Typography } from "@material-ui/core";
import {ImageService} from '../../../Services/Image/Image.service';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../../Routing/routes'

type AuctionIdProps = {
  id : string
}

const AuctionListElement: React.FC<IAuctionListElementProps> = ({ data }) => {

  const [photo, setPhoto] = useState<string>('');
  const history = useHistory<AuctionIdProps>();

  useEffect(() => {
    (
      async () => {
        const response = await ImageService.getMainImage(data.id);
        setPhoto(response);
      }
    )()
  },[data.id])

  const getPhoto = () : string => {
    if(!photo) {
      return 'https://via.placeholder.com/150'
    }
    return photo;
  }

  const handleAuctionClick = () : void => {
    history.push(`/auction/${data.id}`)
  }

  return (
    <Paper onClick={handleAuctionClick}>
      <Container style={{ display: "flex" }} maxWidth={false} >
        <div>
          <img
            src={getPhoto()}
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
