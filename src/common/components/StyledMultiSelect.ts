import React from "react";
import ReactSelect, { Props } from "react-select";
//import {defaultProps} from "react-select/dist/declaration/Select"
import styled from "styled-components";

export const StyledMultiSelect = styled(ReactSelect)`
  .Select__control {
    min-height: 40px;
    min-width: 164px;
    max-width: 364px;
    background: ${({ theme }) => theme.colors.white};
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }

  .Select__multi-value {
    background: ${({ theme }) => theme.colors.red};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__multi-value__label {
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__indicator Select__dropdown-indicator {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  }
  .Select__value-container
    Select__value-container--is-multi
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
  
  .Select__option {
    border-bottom: "0.5px solid ${({ theme }) => theme.colors.lightest_grey}";
    color: ${({ theme }) => theme.colors.light_grey};
    backgroundcolor: ${({ theme }) => theme.colors.white};
  }
  .Select__option:hover {
    background-color:${({ theme }) => theme.colors.dark_red};
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__option:focused {
    background-color: ${({ theme }) => theme.colors.lightest_red};
    color: ${({ theme }) => theme.colors.white};
  }
  .Select__option--is-focused {
    background-color: ${({ theme }) => theme.colors.lightest_red};
    color: ${({ theme }) => theme.colors.white};
  }
`;
export interface SelectProps
  extends React.HTMLAttributes<HTMLSelectElement | HTMLInputElement> {    
  options: Array<any>;
  isMulti: boolean;
  isDisabled: boolean;
  isSearchable: boolean;
}
/**
type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends {[_ in keyof T]: infer U}
  ? U
  : never;

export type CustomSelectProps<T> = Pick<
  ReactSelect<T>['props'],
  KnownKeys<ReactSelect<T>['props']>
>;*/