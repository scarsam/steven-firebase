import React from 'react';
import styled from 'styled-components';
import Container from './Container';

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
      <Container>{children}</Container>
    </MainStyles>
  );
}

export default Main;
