import React from "react";
import { connect } from "react-redux";
import { auth } from "../store/actions/userActions";

function Login(props) {
  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    props.auth(provider);
  };

  return (
    <>
      <form onSubmit={auth} data-provider={"google"}>
        <button type="submit">Login with Google</button>
      </form>
      <form onSubmit={auth} data-provider={"facebook"}>
        <button type="submit">Login with Facebook</button>
      </form>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  auth: provider => dispatch(auth(provider))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
