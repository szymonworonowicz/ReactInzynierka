import React from "react";
import {Route} from 'react-router-dom'
import {IRouteProps} from '../Interfaces/IRouteProps'


const NormalRoute : React.FC<IRouteProps> = ({Component,Layout, Path, isExact = true}) => {

    debugger;
    return  (
        <Route 
            exact = {isExact}
            path={Path}
            render = {props => (
                <Layout>
                    <Component {...props}></Component>
                </Layout>
            )}
        /> 

    )
} 

export default NormalRoute;