import React from "react";
import styled from "styled-components";

const Width100Styles = styled.div`
  width: 100%;
`;

export const Width100 = ({ children }) => (
  <Width100Styles>{children}</Width100Styles>
);
