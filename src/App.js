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
  @import url('https://fonts.googleapis.com/css?family=Asap:400,500&display=swap');
  body {
    font-family: 'Asap', sans-serif;
    background: #2193b0; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2193b0, #6dd5ed); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2193b0, #6dd5ed);
    color: #222525;
    padding: 0;
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }
  .btn {
    border: 0;
    border-radius: 4px;
    padding: 0px 30px;
    font-size: 15px;
  }
  .facebook {
    color: white;
    background-color: #3b5998;
    &:hover {
      cursor: pointer;
    }
  }
  .google {
    color: white;
    background-color: #dd4b39;
    &:hover {
      cursor: pointer;
    }
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
