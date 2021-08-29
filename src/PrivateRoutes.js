import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { getCookie } from "utils";
import { COOKIE_KEYS } from "const";
export default function PrivateRoutes(props) {
  const { component: Component, ...rest } = props;
  const isAuth = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  console.log("isAuth", isAuth);
  //TODO: check user login and redirect route
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    />
  );
}

PrivateRoutes.propTypes = {
  component: PropTypes.func,
};
