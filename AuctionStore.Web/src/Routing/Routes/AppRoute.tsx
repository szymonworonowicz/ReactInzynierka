import React from "react";
import {Route} from 'react-router-dom'

//@ts-ignore
const AppRoute = ({ component: Component, layout: Layout, path = '', exact =true , ...rest}) => (
	<Route
		path={path}
		exact={exact}
		render={(props) => (
			<Layout {...props}>
				<Component {...rest} />
			</Layout>
		)}
	/>
);

export default AppRoute;