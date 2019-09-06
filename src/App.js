import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import login from './components/Login';
import Layout from './layouts/Layout';
import dashboard from './components/Dashboard';
import group from './components/Group';
import invite from './components/Invite';
import history from './routes/History';
import PrivateRouter from './routes/PrivateRoute';
import './styles/base.scss';

function App() {
  return (
    <Router history={history}>
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

// TODO
// - Firebase security rules
// - Look over component names
// - Move form into component
// - Added calculate expense code
