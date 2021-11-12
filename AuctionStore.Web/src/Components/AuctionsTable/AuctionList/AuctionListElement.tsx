import React, { useState, useEffect } from "react";
import { IAuctionListElementProps } from "../../../Interfaces/Auction/";
import {
  Paper,
  Container,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { ImageService } from "../../../Services/Image/Image.service";
import { AttachMoney } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AuctionStatus,
  getAuctionStatusLabel,
} from "../../../Helpers/constans";
import { AccessTime } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../shared/hooks/useToast";

const useStyles = makeStyles({
  root: {
    display: "flex",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "5px",
    right: "5px",
  },
  photo: {
    display: "flex",
    flexDirection: "column",
    marginRight: "10px",
  },
  content: {
    width: "100%",
    position: "relative",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  description: {
    position: "absolute",
    bottom: "3px",
    right: "3px",
  },
});

type AuctionIdProps = {
  id: string;
};

const AuctionListElement: React.FC<IAuctionListElementProps> = ({
  data,
  hideStatus,
}) => {
  const [photo, setPhoto] = useState<string>("");
  const history = useHistory<AuctionIdProps>();
  const classes = useStyles();
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
      ImageService.getMainImage(data.id)
        .then(response => {
          setPhoto(response);
        })
        .catch(() => {
          setPhoto("https://via.placeholder.com/150")
        })
  }, [data.id, t, toast]);

  const handleAuctionClick = (): void => {
    history.push(`/auction/${data.id}`);
  };

  const getAuctionStatus = (): string => {
    return getAuctionStatusLabel(t).get(data.status) ?? "";
  };

  const handlePaymentClick = (e : React.MouseEvent) : void => {
    e.stopPropagation();
    history.push(`/confirm_auction/${data.id}`);
  }

  return (
    <Paper onClick={handleAuctionClick}>
      <Container className={classes.root} maxWidth={false}>
        {data.timeStampDuration && (
          <div className={classes.icon}>
            <AccessTime />
          </div>
        )}

        <div className={classes.photo}>
          <img src={photo} alt="" width="150px" height="150px" />
        </div>
        <div className={classes.content}>
          <div className={classes.navbar}>
            <Typography variant="h6" align="center">
              {" "}
              {data.title}
            </Typography>

            <div style={{ display: "flex" }}>
              {data.status === AuctionStatus.Finish && (
                <Tooltip title={`${t("pay")}`}>
                  <IconButton onClick={handlePaymentClick}>
                    <AttachMoney />
                  </IconButton>
                </Tooltip>
              )}
              {!hideStatus && <p>{getAuctionStatus()}</p>}
            </div>
          </div>

          <p style={{wordBreak: 'break-all'}}>{data.description}</p>
          <p className={classes.description}>{data.price} zł</p>
          <p></p>
        </div>
      </Container>
    </Paper>
  );
};

export default AuctionListElement;
