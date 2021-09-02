import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ICategoryPanelElementProps } from "./ICategoryPanelElementProps";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    expandIcon: {
        "&$expanded": {
          transform: "translateY(-10%) rotate(0deg)"
        }
      },
    expanded: {},
    rootList: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    listElem : {
      display:'flex',
      justifyContent:'space-between'
    }
  })
);

const CategoryPanelElement: React.FC<ICategoryPanelElementProps> = ({
  data,
  deleteCategory,
  deleteSubCategory
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handleDeleteCategory = (id: string) => (_e: React.MouseEvent) => {
    deleteCategory(id);
  };

  const handleDeleteSubCategory = (id : string) => (_e : React.MouseEvent) => {
    deleteSubCategory(id);
  };

  const generateSubCategories = () => {
    return data.subCategories.map((subCategory) => {
      return (
        <ListItem button key={subCategory.id}>
            <div className = {classes.listElem}>
              <ListItemText primary={subCategory.name} key={`subcategory-name-${subCategory.id}`}/>
              <IconButton onClick={handleDeleteSubCategory(subCategory.id)} >
                <Delete />
              </IconButton>
            </div>
        </ListItem>
      )
    })
  }
  return (
    <div className={classes.root}>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          classes={{ expanded: classes.expanded , expandIcon : classes.expandIcon}}
          expandIcon={<Delete onClick={handleDeleteCategory(data.id)} />}
          aria-controls={`panel${data.id}-content`}
          id={`panel${data.id}-header`}
        >
          <Typography className={classes.heading}>{data.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component='nav' className = {classes.rootList}>
            {generateSubCategories()}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CategoryPanelElement;
