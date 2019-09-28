import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header({ children }) {
  return (
    <header className='d-flex height-vh10 align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col
            className='d-flex justify-content-between'
            xs={12}
            sm={10}
            lg={6}
          >
            <a href='/dashboard'>
              <h1 className='text-white font-weight-bold m-0'>Steven</h1>
            </a>
            {children}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
