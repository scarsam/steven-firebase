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
  background-color: ${props =>
    props.provider === "facebook" ? "#3C5A99" : "#DB4437"};
  border: 0;
  border-radius: 4px;
  color: white;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
  .provider {
    text-transform: capitalize;
  }
`;

const AddGroupFormStyles = styled.form`
  display: flex;
  flex-direction: column;
  input {
    height: 30px;
    border-radius: 3px;
    border: 1px solid #6dd5ed;
    margin: 15px 0 10px 0;
    padding: 0 5px;
  }
  button {
    border: 0;
    border-radius: 4px;
    background-color: #6dd5ed;
    padding: 10px 15px !important;
  }
`;

export const LoginForm = ({ provider, cb }) => (
  <Form onSubmit={cb} data-provider={provider}>
    <ButtonStyles provider={provider} type="submit">
      Continue with <span className="provider">{provider}</span>
    </ButtonStyles>
  </Form>
);

export const GroupForm = ({ cb, children }) => (
  <AddGroupFormStyles onSubmit={cb}>{children}</AddGroupFormStyles>
);
