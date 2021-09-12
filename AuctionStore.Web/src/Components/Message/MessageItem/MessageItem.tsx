import React from "react";
import { IMessageItemProps } from "./IMessageItemProps";
import { Delete } from "@material-ui/icons";
import { makeStyles, IconButton } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "auto",
    position: "relative",
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
  },
});

const MessageItem: React.FC<IMessageItemProps> = ({
  message,
  showMessageMore,
  deleteMessage
}) => {
  const classes = useStyles();

  const handleExpandMessageMore = (): void => {
    showMessageMore(message.id);
  };

  const getMessageDate = () : string => {
    return moment(message.added).format("DD-MM-YYYY HH:MM");
  };
  const handleDeleteMessage = () : void => {
    deleteMessage(message.id);
  }

  return (
    <div className={classes.root}>
      <p className={classes.message} onClick={handleExpandMessageMore}>
        {message.text}
      </p>
      <p className={classes.added}> {getMessageDate()}</p>
      <div className={classes.action}>
        <IconButton onClick={handleDeleteMessage}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageItem;
