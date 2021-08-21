import { ComponentType } from "react";
import { SvgIconProps } from '@material-ui/core';
export interface IStyledTreeItem {
    bgColor?: string,
    color?:string,
    labelIcon : ComponentType<SvgIconProps>,
    labelInfo? : string,
    labelText : string,
    nodeId : string
}