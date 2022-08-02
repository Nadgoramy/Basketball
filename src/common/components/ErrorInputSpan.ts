import styled from "styled-components";

export const ErrorInputSpan = styled.span`
  position: relative;
  //top: 42px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.lightest_red};
  padding-top: 2px;
  height: 18px;
  overflow: hidden;
`;
