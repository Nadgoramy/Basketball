import styled from "styled-components";
import ReactSelect, { Props } from "react-select";

export const StyledSelect = styled(ReactSelect)`
  .Select__control {
    min-height: 40px;
    min-width: 88px;
    background: ${({ theme }) => theme.colors.white};
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }
  &:invalid{
    border: 0.5px solid ${({ theme }) => theme.colors.red};
  }
  .error{
    border: 0.5px solid ${({ theme }) => theme.colors.red};
  }

  .Select__indicator Select__dropdown-indicator {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  }
  .Select__value-container
    Select__value-container--has-value {
  }
  .Select__control:hover {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }

  .Select__control:active {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }

  .Select__control--is-focused {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }
  .Select__control--menu-is-open {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }

  .Select__menu{

  }
  .Select__single-value {
    color: ${({ theme }) => theme.colors.dark_grey};
  }
  .Select__single-value__label {
    color: ${({ theme }) => theme.colors.dark_grey};
  }
  
  .Select__option {
    border-bottom: "0.5px solid ${({ theme }) => theme.colors.lightest_grey}";
    color: ${({ theme }) => theme.colors.light_grey};
    background-color: ${({ theme }) => theme.colors.white};
  }
  .Select__option:hover {
    background-color:${({ theme }) => theme.colors.lightest_red};
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__option:active {
    background-color:${({ theme }) => theme.colors.dark_red};
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__option:isSelected {
    background-color:${({ theme }) => theme.colors.dark_red};
    color: ${({ theme }) => theme.colors.white};
  } 
  .Select__option:focuse {
    background-color: ${({ theme }) => theme.colors.lightest_red};
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__option--is-focused {
    background-color: ${({ theme }) => theme.colors.lightest_red};
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.dark_red};
    color: ${({ theme }) => theme.colors.white};
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