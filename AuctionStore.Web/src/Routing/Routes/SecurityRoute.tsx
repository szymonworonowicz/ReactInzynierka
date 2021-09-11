import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ISecureRouteProps } from "../Interfaces/ISecurityRouteProps";
import { Routes } from "../routes";

const SecurityRoute: React.FC<ISecureRouteProps> = ({
  Component,
  Layout,
  Path,
  isExact = true,
  Role,
}) => {
  const context = useContext(UserContext);
  const { isLogged, userRole } = context;

  const isRouteAvailable = () => {
    return isLogged && Role.some(x => x === userRole);
  };
  if(!isLogged )
  {
    return (
      <Redirect to={{pathname:Routes.home}} />
    )
  }
  return (
    <Route
      exact ={isExact}
      path={Path}
      render={(props) =>
        isRouteAvailable() ? (
          <Layout>
            <Component {...props}></Component>
          </Layout>
        ) : (
          <Redirect to={{pathname:Routes.home}} />
        )
      }
    />
  );
};

export default SecurityRoute;
