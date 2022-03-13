import React from "react";
import { Router, Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import ErrorPage from '../Pages/ErrorPage'
import Profile from "../Pages/Profile";
import ResetPassword from '../Pages/ResetPassword';
import Category from '../Pages/Category';
import AddAuction from '../Pages/AddAuction';
import Messages from '../Pages/Messages' 
import Auction from '../Pages/Auction' 
import AuctionConfirmation from '../Pages/AuctionConfirmation';
import NewsletterForm from '../Pages/Newsletter';
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
        <BrowserRouter>
          
          <Route exact path={Routes.home} render={() => <DefaultLayout><Home/></DefaultLayout>}/>
          <Route path ={Routes.resetPassword} render={() =><EmptyLayout><ResetPassword/></EmptyLayout> } />
          <Route path ={Routes.errorPage} render={() => <EmptyLayout><ErrorPage/></EmptyLayout>}/>
          <AppRoute 
            path={Routes.category}
            component={Category}
            layout={DefaultLayout}
          />
          <AppRoute 
            path={Routes.auctionDetails}
            component={Auction}
            layout={DefaultLayout}
          />          
          
          <AppRoute 
          path={Routes.newsletter}
          component={NewsletterForm}
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

          <SecurityRoute 
            Path={Routes.confirmAuction}
            Layout={EditProfileLayout}
            Component={AuctionConfirmation}
            Role={[UserRoles.User]}
          />
          
        </BrowserRouter>
    </Router>
  );
};

export default AppRouter;
