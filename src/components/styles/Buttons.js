import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  background-color: white;
  border: 0;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const AddGroupStyles = styled.button`
  color: white;
  border-radius: 50%;
  background-color: #6dd5ed;
  border: 2px solid white;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  height: 45px;
  width: 45px;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteGroupStyles = styled.button`
  border: 0;
  border-radius: 4px;
  background-color: #f44336;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export const Button = ({ cb, children }) => (
  <ButtonStyles onClick={cb}>{children}</ButtonStyles>
);

export const AddGroup = ({ cb, text }) => (
  <AddGroupStyles onClick={cb}>{text}</AddGroupStyles>
);

export const DeleteGroup = ({ cb, text }) => (
  <DeleteGroupStyles onClick={cb}>{text}</DeleteGroupStyles>
);
