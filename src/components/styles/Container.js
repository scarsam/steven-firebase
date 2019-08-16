import React from "react";
import styled from "styled-components";

const ContainerStyles = styled.div`
  display: flex;
  max-width: 350px;
  width: 100%;
`;

function Container({ children }) {
  return <ContainerStyles>{children}</ContainerStyles>;
}

export default Container;
