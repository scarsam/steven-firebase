import React from "react";
import { FirebaseContext } from "../firebase";

function Dashboard(props) {
  const { firebase, user } = React.useContext(FirebaseContext);

  function logout() {
    firebase.logout();
    props.history.push("/");
  }

  return (
    <>
      {user && <p>Hello {user.displayName}</p>}
      <button onClick={logout}>logout</button>
    </>
  );
}

export default Dashboard;
