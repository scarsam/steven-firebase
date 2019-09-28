import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Main({ children }) {
  return (
    <main className='height-min-vh-80 justify-content-center align-items-center d-flex'>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} sm={10} lg={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Main;
