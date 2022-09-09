import React from "react";
import ReactSelect from "react-select";
import styled from "styled-components";
import { themeColors } from "ThemeColors";

export const StyledMultiSelect = styled(ReactSelect)`
  .Select__control {
    min-height: 40px;
    min-width: 164px;
    max-width: 364px;
    background: ${themeColors.white};
    border: 0.5px solid ${themeColors.lightest_grey};
    border-radius: 4px;
    cursor: pointer;
    box-shadow: none;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }

  .Select__multi-value {
    background: ${themeColors.red};
    border-radius: 4px;
    color: ${themeColors.white};
    padding: 0 4px 0 4px;
    height: 24px;
  }
  .Select__multi-value__label {
    color: ${themeColors.white};
  }
  .Select__indicator Select__dropdown-indicator {
    //border: 0.5px solid ${themeColors.lightest_grey};
  }
  .Select__value-container
    Select__value-container--is-multi
    Select__value-container--has-value {
  }
  .Select__control:hover {
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
  }

  .Select__control:active {
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
  }

  .Select__control--is-focused {
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
  }

  .Select__menu {
    overflow-wrap: anywhere;
  }
  .Select__control--menu-is-open {
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
  }

  .Select__option {
    border-bottom: 0.5px solid ${themeColors.lightest_grey};
    color: ${themeColors.light_grey};
    backgroundcolor: ${themeColors.white};
  }
  .Select__option:hover {
    background-color: ${themeColors.dark_red};
    color: ${themeColors.white};
  }
  .Select__option:focused {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }
  .Select__option--is-focused {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }

  input{
    display:none;
  }
`;
export interface SelectProps
  extends React.HTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  options: Array<any>;
  isMulti: boolean;
  isDisabled: boolean;
  isSearchable: boolean;
}
