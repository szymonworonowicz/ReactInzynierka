import React from "react";
import { IMessageItemProps } from "../../../Interfaces/Messages/";
import { Delete,Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles, IconButton } from "@material-ui/core";
import moment from "moment";
import clsx  from 'clsx'

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "auto",
    position: "relative",
    margin:"-4px",
    "&>p": {
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
    },
  },
  message: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "70%",
    maxWidth:"60vw"
  },
  added: {
    width: "20%",
    paddingLeft: "2%",
  },
  action: {
    width: "5%",
    display:'flex'
  },
  readed : {
    backgroundColor:'#D6AD60;'
  }
});

const MessageItem: React.FC<IMessageItemProps> = ({
  message,
  showMessageMore,
  deleteMessage,
  handleMessageReaded
}) => {
  const classes = useStyles();

  const handleExpandMessageMore = (): void => {
    showMessageMore(message.id);
  };

  const getMessageDate = () : string => {
    return moment.unix(message.added).format("DD-MM-YYYY HH:MM");
  };
  const handleDeleteMessage = () : void => {
    deleteMessage(message.id);
  }

  const handleUnreadMessage = () : void => {
    handleMessageReaded(message.id)
  } 

  return (
    <div className={clsx({
      [classes.root] : true,
      [classes.readed]: !message.isReaded
    })}>
      <p className={classes.message} onClick={handleExpandMessageMore}>
        {message.text}
      </p>
      <p className={classes.added}> {getMessageDate()}</p>
      <div className={classes.action}>
        <IconButton onClick={handleDeleteMessage}>
          <Delete />
        </IconButton>
        <IconButton onClick={handleUnreadMessage}>
        {message.isReaded ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
    </div>
  );
};

export default MessageItem;
