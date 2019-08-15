import React from "react";
import styled from "styled-components";

const SubHeadlineStyles = styled.p`
  font-size: 17px;
  line-height: 26px;
  padding-bottom: 15px;
`;

const HeadlineStyles = styled.h1`
  font-size: 20px;
  margin-bottom: 0;
`;

export const SubHeadline = ({ text }) => <SubHeadlineStyles>{text}</SubHeadlineStyles>;

export const Headline = ({ text }) => <HeadlineStyles>{text}</HeadlineStyles>;