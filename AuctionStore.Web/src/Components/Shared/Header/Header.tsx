import React from "react";
import {IHeaderProps} from './IHeaderProps';
import { Typography } from "@material-ui/core";

const Header: React.FC<IHeaderProps> = ({header}) => {

    return (
        <div>
            <Typography variant='h3'>  {header}</Typography>
        </div>
    )
} 

export default Header;