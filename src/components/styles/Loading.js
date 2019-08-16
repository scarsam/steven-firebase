import React from "react";
import styled from "styled-components";

const LoadingStyles = styled.p`
  color: white;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  margin: 0;
`;

function Loading({ cb, children }) {
  return <LoadingStyles onClick={cb}>{children}</LoadingStyles>;
}

export default Loading;
