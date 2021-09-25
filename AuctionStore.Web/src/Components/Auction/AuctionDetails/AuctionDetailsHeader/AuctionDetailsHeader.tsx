import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuctionDetailsHeaderProps } from "./IAuctionDetailsHeaderProps";
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { Lock, Delete } from "@material-ui/icons";
import { UserContext } from "../../../../Context/UserContext";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../../shared/hooks/useToast";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import RemainingTimeCounter from './RemainingTimeCounter/RemainingTimeCounter';
import { IAuctionDetails } from "../../../../Interfaces/Auctions";
import moment from 'moment';

type timeCounterDataType = Pick<IAuctionDetails,"timeStampDuration" | "timeStampEnd" | "timeStampStart">;

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  root: {
    padding: "10px",
  },
});

const AuctionDetailsHeader: React.FC<IAuctionDetailsHeaderProps> = ({
  data,
}) => {
  const context = useContext(UserContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const toast = useToast();

  const [connection, setConnection] = useState<HubConnection>();
  const [newPrice, setNewPrice] = useState<number>();
  const [actualOffer, setActualOffer] = useState<number>(data.maxOffer);

  useEffect(() => {
    (async () => {
      try {
        const connection: HubConnection = new HubConnectionBuilder()
          .withUrl("https://localhost:44315/hub", {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
          })
          .configureLogging(LogLevel.Information)
          .build();
  
        await connection.start();
  
        await connection.invoke("JoinGroup", {
          UserId: context.userId?.toString(),
          AuctionId: data.id.toString(),
        });
  
        connection.onreconnected(async () => {
            await connection.start()
        });
  
        connection.on("getOffer", (user, message) => {
          debugger;
          if(data.userId !== user) {
              setActualOffer(parseInt(message));
              toast(t('newOffer'),'error');
              if(data.timeStampDuration !== null) {
                data.timeStampStart = moment().unix();
                data.timeStampEnd = data.timeStampStart + data.timeStampDuration;
              }
          }
          else {
              toast(t('yourAuction'),'error');
          }
        });
  
        setConnection(connection);
      } catch (error) {
        console.log(error);
      }
    })();
    //@TODO sprawdzic tablice
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleNewValueChange = (
    e: React.ChangeEvent<{ value: string }>
  ): void => {
    setNewPrice(parseInt(e.target.value));
  };

  const handleAddOffer = (): void => {
    if ((newPrice ?? 0) > actualOffer) {
      connection?.invoke("addOffer", {
        userId: context.userId?.toString(),
        auctionId: data.id.toString(),
        offer: newPrice ?? 0,
      });

      toast(t("addOffer"), "success");
    }
  };

  return (
    <div>
      <Paper>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item xs={7}>
            <Typography variant="h5">{data.title}</Typography>
          </Grid>
          <Grid item xs={5} className={classes.buttons}>
            {context.userId === data.userId && (
              <div>
                <IconButton>
                  <Lock />
                </IconButton>
                <IconButton>
                  <Delete />
                </IconButton>
              </div>
            )}
          </Grid>
          <Grid item xs={4}>
            <RemainingTimeCounter data = {data as timeCounterDataType}/>
          </Grid>
          <Grid item xs={3}>
            <div> actualOffer : {actualOffer}</div>
          </Grid>
          <Grid item xs={5}>
            {
              context.userId !== data.userId && (
                <div>
                <FormControl fullWidth>
                  <InputLabel htmlFor="newPrice">{t("newPrice")}</InputLabel>
                  <Input
                    id="newPrice"
                    autoFocus
                    fullWidth
                    value={newPrice}
                    onChange={handleNewValueChange}
                  />
                </FormControl>
                <Button onClick={handleAddOffer}>{t("AddOffer")}</Button>
              </div>
              )
            }
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AuctionDetailsHeader;