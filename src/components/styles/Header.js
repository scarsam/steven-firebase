import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const HeaderStyles = styled.header`
  align-items: center;
  display: flex;
  height: 10vh;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  & > div {
    justify-content: ${props =>
      props.loggedIn === true ? 'space-between' : 'center'};
  }
`;

const LogoStyles = styled.h1`
  color: white;
  font-weight: bold;
  margin: 0;
`;

function Header({ loggedIn, children }) {
  return (
    <HeaderStyles loggedIn={loggedIn}>
      <Container>
        <LogoStyles>Steven</LogoStyles>
        {children}
      </Container>
    </HeaderStyles>
  );
}

export default Header;
