import React from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { userListener } from "./store/actions/userActions";
import login from "./components/Login";
import Layout from "./Layout";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import PrivateRouter from "./PrivateRoute";
import history from "./History";

function App(props) {
  React.useEffect(() => {
    props.userListener();
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path="/" component={login} />
          <Route path="/group/:groupId/invite" component={invite} />
          <PrivateRouter path="/dashboard" component={dashboard} />
          <PrivateRouter path="/group/:groupId" component={group} />
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
