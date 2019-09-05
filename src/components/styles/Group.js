import React from 'react';
import styled from 'styled-components';

const GroupStyles = styled.div`
  border: 1px solid #2193b0;
  border-radius: 4px;
  a {
    flex: 4;
  }
  p {
    flex: 3;
  }
  button {
    flex: 1;
  }
`;

function Group({ children }) {
  return (
    <GroupStyles className='d-flex mb-2 justify-contente-between align-items-center px-3 py-2'>
      {children}
    </GroupStyles>
  );
}

export default Group;
