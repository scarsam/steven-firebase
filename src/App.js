import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import login from "./components/Login";
import Layout from "./Layout";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import PrivateRouter from "./PrivateRoute";
import history from "./History";

function App(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={login} />
        <Route path="/group/:groupId/invite" component={invite} />
        <Layout>
          <PrivateRouter path="/dashboard" component={dashboard} />
          <PrivateRouter path="/group/:groupId" component={group} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
