import React from "react";
import styled from "styled-components";

const LogoStyles = styled.h1`
  color: white;
  font-weight: bold;
  margin: 0;
`;

function Logo({ text }) {
  return <LogoStyles>{text}</LogoStyles>;
}

export default Logo;
