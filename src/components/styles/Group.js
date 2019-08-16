import React from "react";
import styled from "styled-components";

const GroupStyles = styled.div`
  align-items: center;
  border: 1px solid #2193b0;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  a {
    text-decoration: none;
    color: #0a8080;
    font-weight: 500;
    flex: 4;
    &:hover {
      color: #087575;
    }
  }
  p {
    margin: 0;
    flex: 3;
  }
  button {
    flex: 1;
  }
`;

function Group({ children }) {
  return <GroupStyles>{children}</GroupStyles>;
}

export default Group;
