import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HeaderStyles = styled.header`
  align-items: center;
  display: flex;
  height: 10vh;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
`;

const LogoStyles = styled.h1`
  color: white;
  font-weight: bold;
  margin: 0;
`;

function Header({ loggedIn, children }) {
  return (
    <HeaderStyles>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={2}>
            <LogoStyles>Steven</LogoStyles>
          </Col>
          <Col className='text-right' xs={3}>
            {children}
          </Col>
        </Row>
      </Container>
    </HeaderStyles>
  );
}

export default Header;
