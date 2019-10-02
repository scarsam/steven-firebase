import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import Layout from './layouts/Layout';
import Groups from './containers/Groups';
import Expenses from './containers/Expenses';
import Invite from './containers/Invite';
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
          <PrivateRouter path='/dashboard' component={Groups} />
          <PrivateRouter
            exact
            path='/group/:groupId/:groupName'
            component={Expenses}
          />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;

// TODO
// - Firebase security rules
// - Delete your own expenses
// - Add timestamps for each expense
// - Sort groups newest at the top
// - Start adding unit tests
