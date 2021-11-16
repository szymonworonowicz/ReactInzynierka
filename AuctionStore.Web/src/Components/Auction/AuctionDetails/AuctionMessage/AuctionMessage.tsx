import React, { useState, useContext } from "react";
import { IAuctionMessageProps } from "../../../../Interfaces/Auction/";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { MessageService } from "../../../../Services/Messaage/Message.service";
import { UserContext } from "../../../../Context/UserContext";
import {SendMessageType } from "../../../../Types/Messages/";
import { useToast } from "../../../../shared/hooks/useToast";


const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
  },
  button : {
    width:'15%'
  },
  textField :{

  }
});

const AuctionMessage: React.FC<IAuctionMessageProps> = ({ auctionId }) => {
  const [message, setMessage] = useState<string>("");
  const context = useContext(UserContext);

  const classes = useStyles();
  const { t } = useTranslation();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<{ value: string }>): void => {
    const { value } = e.target;

    setMessage(value);
  };

  const handleSubmit = async (): Promise<void> => {
    const sendMessage : SendMessageType = {
      auctionId : auctionId ,
      userId : context.userId as string,
      text : message
    };

    MessageService.sendMessage(sendMessage)
      .then(response => {
        if(response) {
          toast(t('success_send_message'),'success')
        }
        else {
          toast(t('failure_send_message'),'error')
        }
      })

  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">{t("sendMessageToAuthor")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="description"
              label={t("messageToAuthor")}
              multiline
              className={classes.textField}
              variant="outlined"
              fullWidth
              value={message}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!message}
            className={classes.button}
          >
            {t("send")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuctionMessage;
