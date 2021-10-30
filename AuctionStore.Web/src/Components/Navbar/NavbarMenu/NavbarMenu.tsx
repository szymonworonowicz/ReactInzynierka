import React, { useState, useContext } from "react";
import styles from "./NavbarMenu.module.css";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { AccountCircle, Mail, ExitToApp, GavelRounded } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { authService } from "../../../Services/Auth/Auth.service";
import { useHistory } from "react-router-dom";
import { UserRoles } from "../../../Helpers/constans";
import { UserContext } from "../../../Context/UserContext";

const NavbarMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(UserContext);
  const { t } = useTranslation();
  const history = useHistory();
  const handleMenuClick = (e: any): void => {
    setAnchorEl(e.target);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogoutClick = (): void => {
    authService.logout();
    history.push('/')
  };

  const handleMessagesClick = (): void => {
    history.push("/messages");
  };

  const handleProfileClick = (): void => {
    history.push("/profile");
  };

  const handleAddAuctionClick = (): void => {
    history.push("/add_auction");
  };

  const isInRoleUser = (): boolean => {
    return context.userRole === UserRoles.User;
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick} className={styles.nav}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={t("account")} />
        </MenuItem>
        {isInRoleUser() && (
          <MenuItem onClick={handleAddAuctionClick}>
            <ListItemIcon>
              <GavelRounded />
            </ListItemIcon>
            <ListItemText primary={t("addAuction")} />
          </MenuItem>
        )}
        <MenuItem onClick={handleMessagesClick}>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary={t("messages")} />
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={t("logout")} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavbarMenu;
