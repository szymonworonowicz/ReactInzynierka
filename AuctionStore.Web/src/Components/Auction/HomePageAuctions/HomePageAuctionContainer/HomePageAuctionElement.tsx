import React from "react";
import { IAuction } from "../../../../Interfaces/Auctions";
import { IDataComponentProps } from "../../../IDataComponentProps";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { ImageService } from "../../../../Services/Image/Image.service";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },  
  photo: {
    display: "flex",
    flexDirection: "column",
    marginRight: "10px",
  },
});
type AuctionIdProps = {
  id: string;
};

const HomePageAuctionElement: React.FC<IDataComponentProps<IAuction>> = ({
  data,
}) => {
  const [photo, setPhoto] = React.useState<string>(
    "https://via.placeholder.com/150"
  );
  const classes = useStyles();
  const history = useHistory<AuctionIdProps>();

  React.useEffect(() => {
    ImageService.getMainImage(data.id).then((response) => {
      setPhoto(response);
    });
  }, [data.id]);

  const handleAuctionClick = () => {
    history.push(`/auction/${data.id}`);
  };

  return (
    <div className={classes.root} onClick={() => handleAuctionClick()}>
      <div className={classes.photo}>
        <img src={photo} alt="" width="150px" height="150px" />
      </div>
      <div>
          <p>{data.title}</p>
      </div>
    </div>
  );
};

export default HomePageAuctionElement;
