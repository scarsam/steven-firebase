import React from "react";
import { Route, Redirect } from "react-router-dom";
// import useAuth from "./components/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const user = useAuth();
  const user = true;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
