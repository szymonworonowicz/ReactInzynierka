import React,{useState} from "react";
import styles from './NavbarMenu.module.css'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {AccountCircle, Mail, ExitToApp} from '@material-ui/icons'
import { useTranslation } from "react-i18next";
import { authService } from "../../../Services/Auth/Auth.service";
import { useHistory } from "react-router-dom";

const NavbarMenu: React.FC = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const {t} = useTranslation();
    const history = useHistory();
    const handleMenuClick = (e : any) => {
        setAnchorEl(e.target);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const onLogoutClick = () => {
        authService.logout();
    }

    const onMessagesClick = () => {
        history.push('/messages');
    }

    const onProfileClick = () => {
        history.push('/profile');
    }

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
        <MenuItem  onClick={onProfileClick}>
          <ListItemIcon>
            <AccountCircle/>
          </ListItemIcon>
          <ListItemText primary={t("account")} />
        </MenuItem>
        <MenuItem onClick={onMessagesClick}>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary={t("messages")} />
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon >
            <ExitToApp/>
          </ListItemIcon>
          <ListItemText primary={t("logout")} />
        </MenuItem>
      </Menu>
        </>
    )
}

export default NavbarMenu;