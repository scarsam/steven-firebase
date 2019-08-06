import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import firebase, { FirebaseContext } from "./firebase";
import login from "./components/Login";
import dashboard from "./components/Dashboard";
import group from "./components/Group";
import invite from "./components/Invite";
import { userListener } from "./store/actions/userActions";
import PrivateRouter from "./PrivateRoute";

function App(props) {
  const user = {};
  console.log({ user });

  React.useEffect(() => {
    props.userListener();
  }, []);

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

const mapDispatchToProps = dispatch => ({
  userListener: () => dispatch(userListener)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
