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

  const onLogoutClick = (): void => {
    authService.logout();
  };

  const onMessagesClick = (): void => {
    history.push("/messages");
  };

  const onProfileClick = (): void => {
    history.push("/profile");
  };

  const onAddAuctionClick = (): void => {
    history.push("/add_auction");
  };

  const isInRoleUser = (): boolean => {
    return context.userRole === UserRoles.User;
  };

  return (
    <>
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
        <MenuItem onClick={onProfileClick}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={t("account")} />
        </MenuItem>
        {isInRoleUser() && (
          <MenuItem onClick={onAddAuctionClick}>
            <ListItemIcon>
              <GavelRounded />
            </ListItemIcon>
            <ListItemText primary={t("add_auction")} />
          </MenuItem>
        )}
        <MenuItem onClick={onMessagesClick}>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary={t("messages")} />
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={t("logout")} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarMenu;
