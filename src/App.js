import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import login from './components/Login';
import Layout from './layouts/Layout';
import dashboard from './components/Dashboard';
import group from './components/Group';
import invite from './components/Invite';
import history from './routes/History';
import PrivateRouter from './routes/PrivateRoute';
import { createGlobalStyle } from 'styled-components';

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
  .modal {
    .ReactModal__Overlay {
      background-color: rgba(80, 80, 80, 0.75) !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ReactModal__Content {
      width: 300px;
      min-height: 150px;
      position: relative !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      top: unset !important;
      bottom: unset !important;
      left: unset !important;
      right: unset !important;
    }
  }
`;

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Switch>
        <Layout>
          <Route exact path='/' component={login} />
          <Route path='/group/:groupId/:groupName/invite' component={invite} />
          <PrivateRouter path='/dashboard' component={dashboard} />
          <PrivateRouter
            exact
            path='/group/:groupId/:groupName'
            component={group}
          />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
