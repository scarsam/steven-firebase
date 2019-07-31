import React from "react";
import { FirebaseContext } from "../firebase";

function Login(props) {
  const { firebase } = React.useContext(FirebaseContext);

  async function onSubmit(event) {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    try {
      await firebase.socialLogin(provider);
      props.history.push("/dashboard");
    } catch (err) {
      console.error("Failed social sign in", err);
    }
  }
  return (
    <>
      <form onSubmit={onSubmit} data-provider={'google'}>
        <button type="submit">Login with Google</button>
      </form>
      <form onSubmit={onSubmit} data-provider={'facebook'}>
        <button type="submit">Login with Facebook</button>
      </form>
    </>
  );
}

export default Login;
