import styled from "styled-components";
import { themeColors } from "ThemeColors";

export const MainContainer = styled.div`
  background: ${themeColors.lightest_grey1};
  padding: 112px 80px 0 220px;
  min-height: calc(100vh - 112px);
  position: realtive;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 62px 0 0 0;
    padding: 0;
    width: 100%;
    min-height: calc(100vh - 62px);

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const FullScreenContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
