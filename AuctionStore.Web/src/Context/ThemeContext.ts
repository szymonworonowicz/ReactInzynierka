import React, { createContext } from "react";
import {DictThemeTypes} from '../Enums'
import {getTheme} from '../Helpers/constans'

export type IThemeValue = {
    theme: DictThemeTypes,
    setTheme : React.Dispatch<React.SetStateAction<DictThemeTypes>>
}

export const initialThemeContextValue : IThemeValue = {
    theme : DictThemeTypes.White,
    setTheme : () => {}
} 

const saveTheme = localStorage.getItem('theme');
if(saveTheme !== null) {
    initialThemeContextValue.theme = getTheme(saveTheme);
}

export const ThemeContext = createContext<IThemeValue>(initialThemeContextValue);