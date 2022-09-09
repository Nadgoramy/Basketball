import styled from "styled-components";
import { themeColors } from "ThemeColors";

export const ErrorInputSpan = styled.span`
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: ${themeColors.lightest_red};
  padding-top: 2px;
  height: 18px;
  overflow: hidden;
`;
