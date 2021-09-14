import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";
import { DictThemeTypes } from "../../../Enums";
import {
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import {getEnumKeys} from '../../../Helpers/constans';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    "& >button": {
      width: "24px",
      borderRadius: "50%",
      height: "24px",
    },
    "& .MuiButton-root": {
      minWidth: "24px",
      "&:hover": {},
    },
  },
  black: {
    backgroundColor: "black !important",
    color:'white',
    width: '100%',
    border: '1px solid red',
    '$ .MuiButton-root:hover':{}
  },
  white: {
    backgroundColor: "white !important",
    width: '100%',
    border: '1px solid red',
    '$ .MuiButton-root:hover':{}

  },
  contrast: {
    backgroundColor: "yellow !important",
    width: '100%',
    border: '1px solid red',
    '$ .MuiButton-root:hover':{}

  },
});

const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const {t} = useTranslation();

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleChangeTheme = (key : number) : void => {
    setTheme(key)
    localStorage.setItem('theme', key.toString());
    handleMenuClose();
  }


  return (
    <div className={classes.root}>
      <Button
        className={clsx({
          [classes.black]: theme === DictThemeTypes.Black,
          [classes.white]: theme === DictThemeTypes.White,
          [classes.contrast]: theme === DictThemeTypes.Contrast,
        })}
        onClick={handleMenuClick}
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {getEnumKeys(DictThemeTypes).map((key) => {   
          return (
            <MenuItem onClick={() => handleChangeTheme(DictThemeTypes[key])} key={key}>
              <Button
                className={clsx({
                  [classes.black]: DictThemeTypes[key] === DictThemeTypes.Black,
                  [classes.white]: DictThemeTypes[key] === DictThemeTypes.White,
                  [classes.contrast]: DictThemeTypes[key] === DictThemeTypes.Contrast,
                })}
                onClick={handleMenuClick}
              >
                  {t(key)}
                </Button>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ThemeSelect;
