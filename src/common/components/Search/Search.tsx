import { Input, InputProps } from "../Input/Input";
import icon from "asserts/icons/search_rounded.svg";
import styled from "styled-components";
import React from "react";
import { themeColors } from "ThemeColors";

const StyledContainer = styled.div`
  & > div {
    min-width: 150px;
    max-width: 364px;
    background-color: ${themeColors.white};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
input{
  background-color: ${themeColors.white};
}
  input:active {
    border: 0.5px solid ${themeColors.lightest_grey};
    outline-width: 0;
    box-shadow: none;
    background-color: ${themeColors.white};
  }

  input:enabled {
    outline-width: 0;
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
    background-color: ${themeColors.white};
  }
  input:focus {
    outline-width: 0;
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
    background-color: ${themeColors.white};
  }
  input:visited {
    outline-width: 0;
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
    background-color: ${themeColors.white};
  }
`;

export const Search = React.forwardRef((props: InputProps, ref: any) => {
  const { children, ...rest } = props;
  return (
    <StyledContainer>
      <Input
        ref={ref}
        placeholder="Search..."
        icon={icon}
        className="search-container"
        width="366px"
        {...rest}
      >
        {children}
      </Input>
    </StyledContainer>
  );
});