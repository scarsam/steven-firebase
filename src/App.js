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
    background: #2193b0; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2193b0, #6dd5ed); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2193b0, #6dd5ed);
    padding: 0;
    margin: 0;
  }
`;

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Switch>
        <Layout>
          <Route exact path="/" component={login} />
          <Route path="/group/:groupId/:groupName/invite" component={invite} />
          <PrivateRouter path="/dashboard" component={dashboard} />
          <PrivateRouter
            exact
            path="/group/:groupId/:groupName"
            component={group}
          />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
