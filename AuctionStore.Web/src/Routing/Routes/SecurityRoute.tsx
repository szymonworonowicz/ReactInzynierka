import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ISecureRouteProps } from "../Interfaces/ISecurityRouteProps";
import { Routes } from "../routes";

const SecurityRoute: React.FC<ISecureRouteProps> = ({
  Component,
  Layout,
  Path,
  isExact = false,
  Role,
}) => {
  const context = useContext(UserContext);
  const { isLogged, userRole } = context;

  const isRouteAvailable = () => {
    return isLogged && Role === userRole;
  };

  return (
    <Route
      render={(props) =>
        isRouteAvailable() ? (
          <Layout>
            <Component {...props}></Component>
          </Layout>
        ) : (
          <Redirect to={{pathname:Routes.login, state:{from: props.location}}} />
        )
      }
    />
  );
};

export default SecurityRoute;
