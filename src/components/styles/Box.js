import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Box({ isLoading = false, center = false, children }) {
  return isLoading ? (
    <Row className='justify-content-center'>
      <Col sm='auto'>
        <Spinner animation='grow' />
      </Col>
    </Row>
  ) : (
    <Card
      bsPrefix='card-body shadows-sm rounded bg-white'
      className='shadow-sm'
      border='primary'
    >
      {children}
    </Card>
  );
}

export default Box;
