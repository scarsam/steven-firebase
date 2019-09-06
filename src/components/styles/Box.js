import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BoxStyles = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #49adc5;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  justify-content: ${props => (props.halign ? 'center' : 'start')};
`;

function Box({ isLoading = false, center = false, children }) {
  return isLoading ? (
    <BoxStyles halign={true} className='p-4'>
      <Row className='justify-content-center'>
        <Col sm='auto'>
          <Spinner animation='grow' />
        </Col>
      </Row>
    </BoxStyles>
  ) : (
    <BoxStyles halign={center} className='p-4'>
      {children}
    </BoxStyles>
  );
}

export default Box;
