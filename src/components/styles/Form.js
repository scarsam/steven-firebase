import React from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  button {
    width: 100%;
  }
  button:first-child {
    margin-bottom: 10px;
  }
`;

const ButtonStyles = styled.button`
  background-color: ${props => props.provider === 'facebook' ? '#3C5A99' : '#DB4437'};
  border: 0;
  border-radius: 4px;
  color: white;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  .provider {
    text-transform: capitalize;
  }
`;

export const LoginForm = ({ provider, cb }) => (
  <Form onSubmit={cb} data-provider={provider}>
    <ButtonStyles provider={provider} type="submit">
      Continue with with <span className='provider'>{provider}</span>
    </ButtonStyles>
  </Form>
);
