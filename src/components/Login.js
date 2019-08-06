import React from "react";
import { connect } from "react-redux";
import { auth, logout } from "../store/actions/userActions";

function Login(props) {
  function auth(event) {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    props.auth(provider);
    props.history.push("/");
  }

  return (
    <>
      <form onSubmit={auth} data-provider={"google"}>
        <button type="submit">Login with Google</button>
      </form>
      <form onSubmit={auth} data-provider={"facebook"}>
        <button type="submit">Login with Facebook</button>
      </form>
      <button onClick={() => props.logout()}>logout</button>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  auth: provider => dispatch(auth(provider)),
  logout: () => dispatch(logout)
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
