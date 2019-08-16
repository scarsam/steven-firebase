import React from "react";
import styled from "styled-components";

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
  return <MainStyles>{children}</MainStyles>;
}

export default Main;
