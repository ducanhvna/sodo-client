/*!

=========================================================
* Material Dashboard PRO React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
// import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import PrivateRoutes from "./PrivateRoutes";
import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
import { Provider } from "react-redux";
import store from "./services/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        {/* <Route path="/rtl" component={RtlLayout} /> */}
        <Route path="/login" component={AuthLayout} />
        <Route exact path="/" component={AuthLayout} />
        <PrivateRoutes path="/" component={AdminLayout} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
