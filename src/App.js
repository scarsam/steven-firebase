import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Layout from './layouts/Layout';
import DashboardContainer from './components/DashboardContainer';
import GroupContainer from './components/GroupContainer';
import Invite from './components/Invite';
import history from './routes/History';
import PrivateRouter from './routes/PrivateRoute';
import './styles/base.scss';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path='/' component={Login} />
          <Route path='/group/:groupId/:groupName/invite' component={Invite} />
          <PrivateRouter path='/dashboard' component={DashboardContainer} />
          <PrivateRouter
            exact
            path='/group/:groupId/:groupName'
            component={GroupContainer}
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
