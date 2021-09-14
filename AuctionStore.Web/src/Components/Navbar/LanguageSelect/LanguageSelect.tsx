import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import i18n from "../../../i18n";
import { Flags } from "./Flags";
import { useTranslation } from "react-i18next"; 
import { useToast } from "../../../shared/hooks/useToast";


const LanguageSelect: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const language = i18n.language;
  const {t} = useTranslation();
  const toast = useToast();

  const handleChangeLanguage = (lang: string)=> {
    i18n.changeLanguage(lang);
    toast(t('changed_language'),'success');
    handleMenuClose();
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const getCurrentLanguageFlag = (): JSX.Element | null => {
    return Flags.get(language) ?? null;
  };

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        {getCurrentLanguageFlag()}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {Array.from(Flags.keys()).map((key) => {
          return (
            <MenuItem onClick={() => handleChangeLanguage(key)} key={key}>
              <ListItemIcon>
                {Flags.get(key)}
              </ListItemIcon>
              <ListItemText primary={t(key)} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LanguageSelect;
