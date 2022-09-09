import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeColors } from "ThemeColors";

export const StyledLink = styled(Link)`
  color: ${themeColors.red};
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  &:disabled {
    color: ${themeColors.lightest_grey};
  }
`;
