import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IStyledTreeItem } from "./IStyledTreeItem";
import { TreeItem } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

const StyledTreeItem: React.FC<IStyledTreeItem> = ({
  labelIcon,
  labelText,
  bgColor,
  color,
  labelInfo,
  nodeId,
  children,
}) => {
  const classes = useStyles();
  const LabelIcon = labelIcon;
  const history = useHistory();

  const onClick = () => {
    if(children == null) {
      history.push({
        pathname : '/category',
        state: {
          id:nodeId
        }
      })
    }
  }

  return (
    <TreeItem
      nodeId={nodeId}
      key={nodeId}
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      onClick={onClick}
    >
      {children}
    </TreeItem>
  );
};

export default StyledTreeItem;
