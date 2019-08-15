import React from "react";
import { connect } from "react-redux";
import { auth } from "../store/actions/userActions";
import { SocialIcon } from 'react-social-icons';
import styled from "styled-components";

const FormWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.1);
  border: 1px solid #49adc5;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  height: 350px
  width: 100%;
  padding: 15px;
`;

const Form = styled.form`
  width: 100%;
  button {
    width: 100%;
  }
  button:first-child {
    margin-bottom: 10px;
  }
`

const IntroText = styled.p`
  font-size: 17px;
  line-height: 26px;
  padding-bottom: 15px;
`;

const IntroHeading = styled.h2`
  margin-bottom: 0;
`;

function Login(props) {
  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    props.auth(provider);
  };

  return (
    <FormWrapper>
      <IntroHeading>Split expenses with friends</IntroHeading>
      <IntroText>Less stress when sharing expenses with your partner. Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</IntroText>
      <Form onSubmit={auth} data-provider={"google"}>
        <button className='btn google' type="submit">
          <SocialIcon network="google" fgColor="#ffffff" />
          Continue with with Google
        </button>
      </Form>
      <Form onSubmit={auth} data-provider={"facebook"}>
        <button className='btn facebook' type="submit">
        <SocialIcon network="facebook" fgColor="#ffffff" />
          Continue with Facebook
        </button>
      </Form>
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
