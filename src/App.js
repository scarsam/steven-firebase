import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import login from "./components/Login";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import PrivateRouter from "./routes/PrivateRoute";
import history from "./routes/History";

function App(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={["/", "/group/:groupId/invite"]}>
          <PublicLayout>
            <Route exact path="/" component={login} />
            <Route path="/group/:groupId/invite" component={invite} />
          </PublicLayout>
        </Route>
        <Route exact path={["/dashboard", "/group/:groupId"]}>
          <PrivateLayout>
            <PrivateRouter path="/dashboard" component={dashboard} />
            <PrivateRouter path="/group/:groupId" component={group} />
          </PrivateLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
