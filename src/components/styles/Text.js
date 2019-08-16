import React from "react";
import styled from "styled-components";

const TextLargeStyles = styled.p`
  font-size: 17px;
  line-height: 26px;
  padding-bottom: 15px;
`;

const H1Styles = styled.h1`
  font-size: 20px;
  margin-bottom: 0;
`;

const H4Styles = styled.h4`
  font-size: 17px;
  margin-bottom: 15px;
  margin-top: ${props => (props.marginTop === true ? "20px" : "0")};
`;

export const TextLarge = ({ text }) => (
  <TextLargeStyles>{text}</TextLargeStyles>
);

export const H1 = ({ text }) => <H1Styles>{text}</H1Styles>;

export const H4 = ({ text, marginTop }) => (
  <H4Styles marginTop={marginTop}>{text}</H4Styles>
);
