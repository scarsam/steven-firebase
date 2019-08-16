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

function Header({ cb, children }) {
  return <ButtonStyles onClick={cb}>{children}</ButtonStyles>;
}

export default Header;
