import React from 'react';
import styled from 'styled-components';

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

const RoundButtonStyles = styled.button`
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

const CloseButtonStyles = styled.button`
  border: 0;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

export const Button = ({ cb, children }) => (
  <ButtonStyles onClick={cb}>{children}</ButtonStyles>
);

export const RoundButton = ({ cb, children }) => (
  <RoundButtonStyles onClick={cb}>{children}</RoundButtonStyles>
);

export const CloseButton = ({ cb, children }) => (
  <CloseButtonStyles onClick={cb}>{children}</CloseButtonStyles>
);
