import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { auth } from "../store/actions/userActions";
import Container from "./styles/Container";
import { Headline, SubHeadline } from "./styles/Text";
import { LoginForm } from './styles/Form';

function Login(props) {
  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    props.auth(provider);
  };

  return (
    <Container>
      <Headline text={"Split expenses with friends"} />
      <SubHeadline text={"Less stress when sharing expenses with your partner. Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family."} />
      <LoginForm cb={auth} provider={"google"} />
      <LoginForm cb={auth} provider={"facebook"} />
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  auth: provider => dispatch(auth(provider))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
