import React, { useContext } from "react";
import { useStyles } from "./Navbar.styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ThemeSelect from './ThemeSelect/ThemeSelect'
import LanguageSelect from './LanguageSelect/LanguageSelect'

import { UserContext } from "../../Context/UserContext";
import LoginNav from "./LoginNav/LoginNav";
import NavbarMenu from "./NavbarMenu/NavbarMenu";

const Navbar: React.FC = () => {
  const classes = useStyles();
  const context = useContext(UserContext);
  console.log(context);
  const { isLogged } = context;
  const history = useHistory();

  const handleHome = () => {
    history.push("/");
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.container}>
            <img
              src="./logo.png"
              alt="logo"
              onClick={handleHome}
              height="50px"
              width="50px"
            />
              <div className={classes.menus}>
                <ThemeSelect/>
                <LanguageSelect/>
                {isLogged ? <NavbarMenu /> : <LoginNav />}
              </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
