import React from 'react';
import styled from 'styled-components';

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

function Box({ center = false, children }) {
  return (
    <BoxStyles halign={center} className='p-4'>
      {children}
    </BoxStyles>
  );
}

export default Box;
