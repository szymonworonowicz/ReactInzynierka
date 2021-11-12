import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IStyledTreeViewProps } from "../../../Interfaces/StyleTree/";
import { TreeView } from "@material-ui/lab";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import StyledTreeItem from "./StyledTreeItem/StyledTreeItem";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const StyledTreeView: React.FC<IStyledTreeViewProps> = ({ data }) => {
  const classes = useStyles();


  const generateTreeView = (): ReactNode => {
    return data.map((elem, index) => {
      return (
        <div key={index}>
          {elem.subCategories.length === 0 ? (
            <StyledTreeItem
              key={elem.id}
              nodeId={`${index + 1}`}
              labelText={elem.name}
            />
          ) : (
            <StyledTreeItem
              key={elem.id}
              nodeId={elem.id}
              labelText={elem.name}
            >
              {elem.subCategories.map((subcategory) => {
                return (
                  <StyledTreeItem
                    key={subcategory.id}
                    nodeId={subcategory.id}
                    labelText={subcategory.name}
                  />
                );
              })}
            </StyledTreeItem>
          )}
        </div>
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
