import React from "react";
import { Router } from "react-router-dom";
import Home from "../Pages/Home";
import { history } from "../Helpers";
import NormalRoute from './Routes/NormalRoute'
import DefaultLayout from '../Layouts/DefaultLayout';

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
        <NormalRoute  Layout={DefaultLayout} Path='/' isExact={false} Component={Home}/>
    </Router>
  );
};

export default AppRouter;
