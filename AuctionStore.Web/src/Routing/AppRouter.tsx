import React from "react";
import { Router } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from '../Pages/Profile'
import { history } from "../Helpers";
import { Admin, User } from "../Helpers/constans";
import { Routes } from "./routes";
import NormalRoute from './Routes/NormalRoute'
import DefaultLayout from '../Layouts/Default/DefaultLayout';
import EditProfileLayout from '../Layouts/EditProfile/EditProfileLayout';
import SecurityRoute from './Routes/SecurityRoute'  


history.listen((_) => {
  window.scrollTo(0,0);
})

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>    
        <NormalRoute  Layout={DefaultLayout} Path={Routes.home} isExact={true} Component={Home}/>
        <SecurityRoute Layout={EditProfileLayout} Path={Routes.profile} Component={Profile} Role={[Admin, User]}/>
    </Router>
  );
};

export default AppRouter;
