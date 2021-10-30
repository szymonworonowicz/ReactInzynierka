import React, { useEffect, useState, useMemo } from "react";
import { IAuctionPhotosProps } from "./iAuctionPhotosProps";
import { ImageService } from "../../../Services/Image/Image.service";
import { IAuctionImage } from "../../../Interfaces/Image";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem/CarouselItem";
import { makeStyles } from "@material-ui/styles";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  carousel: {
    "& .CarouselItem": {
      height: "300px",
      display: "flex",
      justifyContent: "center",
    },
  },
});

const AuctionPhotos: React.FC<IAuctionPhotosProps> = ({ id }) => {
  const [auctionImages, setAuctionImages] = useState<Array<IAuctionImage>>([]);
  const classes = useStyles();

  const carouselItems: Array<JSX.Element> = useMemo(() => {
    if (auctionImages.length === 0) {
      return [<CarouselItem photo="https://via.placeholder.com/150" />];
    }
    return auctionImages.map((elem, index) => {
      return <CarouselItem photo={elem.photoString} key={index} />;
    });
  }, [auctionImages]);

  useEffect(() => {
    ImageService.getAuctionImages(id)
      .then((response) => {
        setAuctionImages(response);
      })
      .catch(() => {});
  }, [id]);

  return (
    <div className={classes.root}>
      <Carousel
        autoPlay={false}
        NextIcon={<ArrowForward />}
        PrevIcon={<ArrowBack />}
        className={classes.carousel}
      >
        {carouselItems}
      </Carousel>
    </div>
  );
};

export default AuctionPhotos;
