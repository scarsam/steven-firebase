import React from 'react';
import styled from 'styled-components';

const BoxStyles = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #49adc5;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 500;
  min-height: 350px;
`;

function Box({ children }) {
  return <BoxStyles>{children}</BoxStyles>;
}

export default Box;
