import React from "react";
import { IMessageDetailsProps } from "./IMessageDetailsProps";
import { Grid, Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    width: "60vw",
    '& .MuiInputBase-root.Mui-disabled ' : {
      color:'black'
    }
  },
  content: {
    border: '2px solid black',
    marginTop: '2rem'
  }, 
  text : {
    '& .MuiInputBase-inputMultiline': {
      padding: '0 10px'
    }
  }
});

const MessageDetails: React.FC<IMessageDetailsProps> = ({ message }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getMessageDate = () : string => {
    return moment(message.added).format('DD-MM-YYYY HH:MM')
  }
  return (
    <div className={classes.root}>
      <Grid container alignContent="center" justifyContent="center" spacing={1}>
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={3}>
            <Typography variant="body1">{t("From")}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              {message.from ?? "janusz zabieraj"}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              {getMessageDate()}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.content}>
            <TextField
              rows={6}
              multiline
              disabled
              value={message.text}
              fullWidth
              className={classes.text}
            /> 
        </Grid>
      </Grid>
    </div>
  );
};

export default MessageDetails;
