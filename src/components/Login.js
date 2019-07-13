import React from "react";
import { FirebaseContext } from "../firebase";

function Login(props) {
  const { firebase } = React.useContext(FirebaseContext);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      await firebase.socialLogin();
      props.history.push("/dashboard");
    } catch (err) {
      console.error("Failed social sign in", err);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
