import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IStyledTreeView } from "./IStyledTreeView";
import { TreeView } from "@material-ui/lab";
import { ArrowDropDown, ArrowRight, Home } from "@material-ui/icons";
import StyledTreeItem from "./StyledTreeItem/StyledTreeItem";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const StyledTreeView: React.FC<IStyledTreeView> = ({ data }) => {
  const classes = useStyles();

  let elemNr = data.length +1;

  const generateTreeView = (): ReactNode => {
    return data.map((elem, index) => {
      return (
        <>
          {elem.subCategories.length === 0 ? (
            <StyledTreeItem
              key={elem.id}
              nodeId={`${index + 1}`}
              labelText={elem.name}
              labelIcon={Home}
            />
          ) : (
            <StyledTreeItem
              key={elem.id}
              nodeId={`${index + 1}`}
              labelText={elem.name}
              labelIcon={Home}
            >
              {elem.subCategories.map((subcategory) => {
                return (
                  <StyledTreeItem
                    key={subcategory.id}
                    nodeId={`${elemNr ++}`}
                    labelText={subcategory.name}
                    labelIcon={Home}
                  />
                );
              })}
            </StyledTreeItem>
          )}
        </>
      );
    });
  };
  return (
    <TreeView
      className={classes.root}
      defaultExpandIcon={<ArrowRight />}
      defaultCollapseIcon={<ArrowDropDown />}
      defaultEndIcon={<div style={{ width: "24px" }} />}
    >
      {generateTreeView()}
    </TreeView>
  );
};

export default StyledTreeView;
