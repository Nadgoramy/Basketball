import React from "react";
import ReactSelect from "react-select";
import styled from "styled-components";

export const StyledMultiSelect = styled(ReactSelect)`
  .Select__control {
    min-height: 40px;
    min-width: 364px;
    background: #ffffff;
    border: 0.5px solid #d1d1d1;
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }

  .Select__multi-value {
    background: #e4163a;
    border-radius: 4px;
    color: #fff;
  }
  .Select__multi-value__label {
    color: #fff;
  }
  .Select__indicator Select__dropdown-indicator {
    border: 0.5px solid #d1d1d1;
  }
  .Select__value-container
    Select__value-container--is-multi
    Select__value-container--has-value {
  }
  .Select__control:hover {
    border: 0.5px solid #d1d1d1;
    box-shadow: none;
  }

  .Select__control:active {
    border: 0.5px solid #d1d1d1;
    box-shadow: none;
  }

  .Select__control--is-focused {
    border: 0.5px solid #d1d1d1;
    box-shadow: none;
  }
  .Select__control--menu-is-open {
    border: 0.5px solid #d1d1d1;
    box-shadow: none;
  }
  
  .Select__option {
    border-bottom: "0.5px solid #D1D1D1";
    color: "#9C9C9C";
    backgroundcolor: "white";
  }
  .Select__option:hover {
    background-color: #c60e2e;
    color: #fff;
  }
  .Select__option:focused {
    background-color: #ff768e;
    color: #fff;
  }
  .Select__option--is-focused {
    background-color: #ff768e;
    color: #fff;
  }
`;
export interface SelectProps
  extends React.HTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  options: Array<any>;
  isMulti: boolean;
  isDisabled: boolean;
}
