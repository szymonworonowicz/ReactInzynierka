import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import ResetPassword from '../Pages/ResetPassword';
import Category from '../Pages/Category';
import { history } from "../Helpers";
import { UserRoles } from "../Helpers/constans";
import { Routes } from "./routes";
import AppRoute from "./Routes/AppRoute";
import DefaultLayout from "../Layouts/Default/DefaultLayout";
import EditProfileLayout from "../Layouts/EditProfile/EditProfileLayout";
import EmptyLayout from "../Layouts/EmptyLayout/EmptyLayout";
import SecurityRoute from "./Routes/SecurityRoute";

history.listen((_) => {
  window.scrollTo(0, 0);
});

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <>
        <Switch>
          
          <Route exact path={Routes.home} render={() => <DefaultLayout><Home/></DefaultLayout>}/>
          <Route path ={Routes.resetPassword} render={() =><EmptyLayout><ResetPassword/></EmptyLayout> } />
          <AppRoute 
            exact
            path={Routes.category}
            component={Category}
            layout={DefaultLayout}
          />

          <SecurityRoute
            Path={Routes.profile}
            Layout ={EditProfileLayout}
            Component={Profile}
            Role = {UserRoles.Both}
          />
          
          
        </Switch>
      </>
    </Router>
  );
};

export default AppRouter;
