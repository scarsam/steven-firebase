import React from "react";
import styled from "styled-components";

const HeaderStyles = styled.header`
  align-items: center;
  display: flex;
  height: 10vh;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  & > div {
    justify-content: ${props =>
      props.loggedIn === true ? "space-between" : "center"};
  }
`;

function Header({ loggedIn, children }) {
  return <HeaderStyles loggedIn={loggedIn}>{children}</HeaderStyles>;
}

export default Header;
