import React from "react";
import {Route} from 'react-router-dom'

//@ts-ignore
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route
		render={(props) => (
			<Layout {...props}>
				<Component {...rest} />
			</Layout>
		)}
	/>
);

export default AppRoute;