import React from "react";
import { connect } from "react-redux";
import { auth } from "../store/actions/userActions";
import styled from "styled-components";

const FormWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  height: 400px
  width: 100%;
`;

function Login(props) {
  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    props.auth(provider);
  };

  return (
    <FormWrapper>
      <form onSubmit={auth} data-provider={"google"}>
        <button type="submit">Login with Google</button>
      </form>
      <form onSubmit={auth} data-provider={"facebook"}>
        <button type="submit">Login with Facebook</button>
      </form>
    </FormWrapper>
  );
}

const mapDispatchToProps = dispatch => ({
  auth: provider => dispatch(auth(provider))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
