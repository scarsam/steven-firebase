import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, location, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => user && <Component {...props} />} />
  );
};

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(PrivateRoute);
