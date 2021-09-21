import React, {
  useContext,
  useCallback,
  useMemo,
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
import moment from "moment";
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
  const [actualOffer, setActualOffer] = useState<number>(0);

  const remaining = useMemo(() => {
    if (data.timeStampEnd && data.timeStampStart) {
      return Math.abs(moment().unix() - data.timeStampEnd);
    }
    return Math.abs(moment(data.timeStampDuration).seconds() - 1);
  }, [data.timeStampDuration, data.timeStampEnd, data.timeStampStart]);

  const [remainingTime, setRemainingTime] = useState<number>(remaining);

  let index: NodeJS.Timeout | undefined;

  index = setInterval(() => {
    setRemainingTime((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    return () => clearInterval(index as NodeJS.Timeout);
  }, [index]);

  const connectWithHub = useCallback(async () => {
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
        }
        else {
            toast(t('yourAuction'),'error');
        }
      });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }, [context.userId, data.id, data.userId, t, toast]);

  useEffect(() => {
    (async () => {
      await connectWithHub();
    })();

    return (
        () => {
            connection?.stop();
        } 
    )
  }, [connectWithHub, connection]);

  const getRemainingTime = useCallback(() => {
    const duration = moment.duration(remainingTime, "seconds");
    return `${("00" + duration.hours()).slice(-2)}:${(
      "00" + duration.minutes()
    ).slice(-2)}:${("00" + duration.seconds()).slice(-2)}`;
  }, [remainingTime]);

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
            <Typography variant="h5">
              {t("remainingTime")}: {getRemainingTime()}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div> actualOffer : {actualOffer}</div>
          </Grid>
          <Grid item xs={5}>
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AuctionDetailsHeader;
