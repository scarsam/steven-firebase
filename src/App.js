import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import login from "./components/Login";
import Layout from "./layouts/Layout";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import history from "./routes/History";
import PrivateRouter from "./routes/PrivateRoute";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: red;
  }
`;

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
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

export default App;
