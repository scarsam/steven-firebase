import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CopyClipboard from '../CopyClipboard';

function GroupHeader({ group, total }) {
  return (
    <>
      <Row>
        <Col className='align-self-center'>Group name: {group.name}</Col>
        <Col className='text-right'>
          <CopyClipboard />
        </Col>
      </Row>
      <Row className='mt-2 mb-3 pb-3'>
        <Col className='align-self-center'>Your balance is: ${total}</Col>
        <Col className='text-right'>
          <Button variant='primary' size='sm'>
            Get even
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default GroupHeader;
