import { ElementType } from "react";

export interface IRouteProps  {
    Layout: ElementType,
    Component : ElementType,
    Path: string,
    isExact: boolean
}