import React from "react";
import { IPaperNav } from "../../../Interfaces/Shared/PaperNav/";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  buttons: {
    marginRight: "10px",
  },
  header: {
    marginLeft: "10px",
  },
}));

const PaperNav: React.FC<IPaperNav> = ({
  hasDelete = false,
  header,
  onDelete = () => {},
  onEdit = () => {},
  hasEdit = false,
  ExternalIcon,
  externalIconAction,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>{header && <h2>{header}</h2>}</div>
      <div className={classes.buttons}>
        {ExternalIcon && (
          <IconButton onClick={externalIconAction}>
            <ExternalIcon color="primary" />
          </IconButton>
        )}
        {hasEdit && (
          <IconButton onClick={onEdit}>
            <Edit color="primary" />
          </IconButton>
        )}
        {hasDelete && (
          <IconButton onClick={onDelete}>
            <Delete color="primary" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default PaperNav;
