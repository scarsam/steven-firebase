import React from "react";
import styled from "styled-components";

const ContainerStyles = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #49adc5;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  min-height: 350px;
  width: 100%;
  padding: 15px;
`;

function Container({ children }) {
  return <ContainerStyles>{children}</ContainerStyles>;
}

export default Container;
