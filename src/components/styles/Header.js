import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HeaderStyles = styled.header`
  align-items: center;
  display: flex;
  height: 10vh;
`;

function Header({ children }) {
  return (
    <HeaderStyles>
      <Container>
        <Row className='justify-content-center'>
          <Col className='d-flex justify-content-between' xs={6}>
            <h1 className='text-white font-weight-bold m-0'>Steven</h1>
            {children}
          </Col>
        </Row>
      </Container>
    </HeaderStyles>
  );
}

export default Header;
