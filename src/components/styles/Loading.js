import React from 'react';
import styled from 'styled-components';

const LoadingStyles = styled.p`
  color: white;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

function Loading({ children }) {
  return <LoadingStyles>{children}</LoadingStyles>;
}

export default Loading;
