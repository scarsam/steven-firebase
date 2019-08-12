import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import login from "./components/Login";
import Layout from "./layouts/Layout";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import history from "./routes/History";
import PrivateRouter from "./routes/PrivateRoute";
import { connect } from "react-redux";
import { userListener } from "./store/actions/userActions";

function App({ userListener }) {
  React.useEffect(() => {
    userListener();
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path="/" component={login} />
          <Route path="/group/:groupId/invite" component={invite} />
          <PrivateRouter path="/dashboard" component={dashboard} />
          <PrivateRouter exact path="/group/:groupId" component={group} />
        </Layout>
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = dispatch => ({
  userListener: () => dispatch(userListener)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
