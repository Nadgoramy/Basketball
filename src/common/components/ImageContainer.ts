import styled from "styled-components";
import { themeColors } from "ThemeColors";

export const StyledImageContainer = styled.div`
  position: absolute;
  width: 606px;
  height: 1024px;
  left: 0px;
  top: 0px;
  background: ${themeColors.white};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;
