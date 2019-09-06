import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MainStyles = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  & > div {
    flex-direction: column;
  }
`;

function Main({ children }) {
  return (
    <MainStyles>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={5}>{children}</Col>
        </Row>
      </Container>
    </MainStyles>
  );
}

export default Main;
