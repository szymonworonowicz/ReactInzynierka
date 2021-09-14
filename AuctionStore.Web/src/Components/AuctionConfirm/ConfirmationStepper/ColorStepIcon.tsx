import React from "react";
import { useColorIconStyle } from "./CustomStepperComponents";
import { StepIconProps } from "@material-ui/core";
import {EventNote,AttachMoney, ShoppingBasket,Done} from '@material-ui/icons'
import clsx from "clsx";

const ColorStepIcon : React.FC<StepIconProps> = ({active, completed, icon}) => {
    const classes = useColorIconStyle();

    const icons : {[index : string]: React.ReactElement } = {
        1: <EventNote/>,
        2: <ShoppingBasket/>,
        3: <AttachMoney/>,
        4: <Done/>
    }

    return (
        <div
            className ={
                clsx(
                    classes.root, {
                        [classes.active] : active,
                        [classes.completed] : completed
                    }
                )
            }
        >
            {icons[String(icon)]}
        </div>
    )
}

export default ColorStepIcon;