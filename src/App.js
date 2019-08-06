import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import useAuth from "./components/Auth";
import firebase, { FirebaseContext } from "./firebase";
import login from "./components/Login";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import PrivateRouter from "./PrivateRoute";

function App() {
  // const user = useAuth();
  const user = {};
  console.log({ user });

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Switch>
          <Route exact path="/" component={login} />
          <Route path="/group/:groupId/invite" component={invite} />
          <PrivateRouter path="/dashboard" component={dashboard} />
          <PrivateRouter path="/group/:groupId" component={group} />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
