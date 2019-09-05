import React from 'react';
import styled from 'styled-components';

const LoadingStyles = styled.p`
  color: ${props => (props.dark ? 'black' : 'white')};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

function Loading({ dark = false, children }) {
  return <LoadingStyles dark={dark}>{children}</LoadingStyles>;
}

export default Loading;
