import React from "react";
import { RouteComponentProps } from "react-router-dom";
import AuctionsTable from '../Components/AuctionsTable/AuctionsTable'

type LocationState = {
    id : string
}

const Category:React.FC<RouteComponentProps<{},{},LocationState>> = ({location}) => {

    return (
        <AuctionsTable categoryId ={location.state ? location.state.id : ''}/>
    )
}

export default Category