import React, {useContext } from "react";
import { useStyles } from "./Navbar.styles";
import {
  AppBar,
  Toolbar,
} from "@material-ui/core";

import { UserContext } from "../../Context/UserContext";
import LoginNav from "./LoginNav/LoginNav";
import NavbarMenu from './NavbarMenu/NavbarMenu'

const Navbar: React.FC = () => {
  const classes = useStyles();
  const context = useContext(UserContext);
  console.log(context)
  const { isLogged } = context;


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {isLogged ? (
            <NavbarMenu/>
          ) : (
            <LoginNav />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
