import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ICategoryPanelElementProps } from "./ICategoryPanelElementProps";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
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
      expanded: {}
  })
);

const CategoryPanelElement: React.FC<ICategoryPanelElementProps> = ({
  data,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const deleteCategory = (id: string) => (_e: React.MouseEvent) => {};
  return (
    <div className={classes.root}>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          classes={{ expanded: classes.expanded , expandIcon : classes.expandIcon}}
          expandIcon={<Delete onClick={deleteCategory(data.id)} />}
          aria-controls={`panel${data.id}-content`}
          id={`panel${data.id}-header`}
        >
          <Typography className={classes.heading}>{data.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CategoryPanelElement;
