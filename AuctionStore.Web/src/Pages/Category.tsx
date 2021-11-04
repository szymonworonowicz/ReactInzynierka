import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AuctionsTable from '../Components/AuctionsTable/AuctionsTable'

type LocationState = {
    id : string
}
interface ICategoryProps extends RouteComponentProps<LocationState>{};

const Category:React.FC<ICategoryProps> = ({match}) => {

    
    return (
        <AuctionsTable categoryId ={match.params ? match.params.id : ''}/>
    )
}

export default withRouter(Category);