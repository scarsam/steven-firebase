import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  color: white;
  align-items: center;
  font-size: 12px;
  display: flex;
  height: 10vh;
  justify-content: center;
  margin: 0;
`;

function Footer({ text }) {
  return <FooterStyles>{text}</FooterStyles>;
}

export default Footer;
