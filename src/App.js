import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useAuth from "./components/Auth";
import firebase, { FirebaseContext } from "./firebase";
import login from "./components/Login";
import dashboard from "./components/Dashboard";

function App() {
  const user = useAuth();
  console.log({ user });

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Switch>
          <Route exact path="/" component={login} />
          <Route path="/dashboard" component={dashboard} />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
