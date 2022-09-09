import styled from "styled-components";
import ReactSelect from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { RefAttributes } from "react";
import Select from "react-select/dist/declarations/src/Select";
import { themeColors } from "ThemeColors";

export type PropType = {
  border: boolean;
} & StateManagerProps &
  RefAttributes<Select>;

export const StyledSelect = styled(ReactSelect) <PropType>`
  .Select__control {
    min-height: 40px;
    min-width: 88px;
    background-color: ${themeColors.lightest_grey1};
    border: ${({ border }) =>
    border ? "0.5px solid " + themeColors.lightest_grey : "0"};
    border-radius: 4px;
    cursor: pointer;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      font-size: 15px;
     
    }
  }
  
  &:invalid {
    border: 0.5px solid ${themeColors.red};
  }
  .error {
    border: 0.5px solid ${themeColors.red};
  }

  .Select__placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    background-color: ${themeColors.lightest_grey1};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 15px;
    }
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
  .Select__control--menu-is-open {
    border: 0.5px solid ${themeColors.lightest_grey};
    box-shadow: none;
  }

  .Select__menu {
    overflow-wrap: anywhere;
  }
  .Select__single-value {
    color: ${themeColors.dark_grey};
  }
  .Select__single-value__label {
    color: ${themeColors.dark_grey};
    font-weight: 500;
font-size: 14px;
line-height: 24px;
  }

  .Select__option {
    border-bottom: 0.5px solid ${themeColors.lightest_grey};
    color: ${themeColors.light_grey};
    background-color: ${themeColors.white};

  }
  .Select__option:hover {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }
  .Select__option:active {
    background-color: ${themeColors.dark_red};
    color: ${themeColors.white};
  }
  .Select__option:isselected {
    background-color: ${themeColors.dark_red};
    color: ${themeColors.white};
  }
  .Select__option:focuse {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }
  .Select__option--is-focused {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }
  .Select__option--is-selected {
    background-color: ${themeColors.dark_red};
    color: ${themeColors.white};
  }
`;

export interface OptionTypeValueNumber {
  label: string;
  value: number;
}

export interface OptionTypeValueString {
  label: string;
  value: string;
}
