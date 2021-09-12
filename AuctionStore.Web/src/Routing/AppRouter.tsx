import React from "react";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import ResetPassword from '../Pages/ResetPassword';
import Category from '../Pages/Category';
import AddAuction from '../Pages/AddAuction';
import Messages from '../Pages/Messages' 
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
        <BrowserRouter>
          
          <Route exact path={Routes.home} render={() => <DefaultLayout><Home/></DefaultLayout>}/>
          <Route path ={Routes.resetPassword} render={() =><EmptyLayout><ResetPassword/></EmptyLayout> } />
          <AppRoute 
            path={Routes.category}
            component={Category}
            layout={DefaultLayout}
          />

          <SecurityRoute
            Path={Routes.addAuction}
            Layout ={EditProfileLayout}
            Component={AddAuction}
            Role = {[UserRoles.User]}
          />
          <SecurityRoute
            Path={Routes.profile}
            Layout ={EditProfileLayout}
            Component={Profile}
            Role = {UserRoles.Both}
          />
          <SecurityRoute 
            Path={Routes.messages}
            Layout={DefaultLayout}
            Component={Messages}
            Role={UserRoles.Both}
          />
          
        </BrowserRouter>
      </>
    </Router>
  );
};

export default AppRouter;
