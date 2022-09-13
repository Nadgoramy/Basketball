import styled from "styled-components";
import ReactSelect, { StylesConfig } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { RefAttributes } from "react";
import Select from "react-select/dist/declarations/src/Select";
import { themeColors } from "ThemeColors";

export type SelectPropType = {
  border: boolean;
} & StateManagerProps &
  RefAttributes<Select>;

export const StyledSelect = styled(ReactSelect) <SelectPropType>`
  .Select__control {    
    border: ${({ border }) => border ? "0.5px solid " + themeColors.lightest_grey : "0"};   

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
  .Select__single-value__label {
    color: ${themeColors.dark_grey};
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }  
`;
/*
//control
border-radius: 4px;
    cursor: pointer;  
    min-height: 40px;
    min-width: 88px;
    background-color: ${themeColors.lightest_grey1};

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

.Select__menu {
    overflow-wrap: anywhere;
  }
.Select__single-value {
    color: ${themeColors.dark_grey};
  }
.Select__option {
    //border-bottom: 0.5px solid ${themeColors.lightest_grey};
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
  .Select__option--is-focused {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }
  .Select__option--is-selected {
    background-color: ${themeColors.dark_red};
    color: ${themeColors.white};
  }
  */


interface IWithIsLastProp {
  isLast?: boolean
}

export interface OptionTypeValueNumber extends IWithIsLastProp {
  label: string;
  value: number;
}

export interface OptionTypeValueString extends IWithIsLastProp {
  label: string;
  value: string;
}

export const SingleSelectCustomStyles: StylesConfig<unknown, boolean> = {
  control: (provided) => {
    return {
      ...provided,

      minHeight: "40px",
      minWidth: "88px",
      backgroundColor: themeColors.lightest_grey1,
      borderRadius: "4px",
      cursor: "pointer",

      outline: "none",
      boxShadow: "none",
      //border: "0.5px solid " + themeColors.lightest_grey,
      "&:focused": {
        border: "0.5px solid " + themeColors.lightest_grey,
        boxShadow: "none",
      },
      "&:hover": {
        border: "0.5px solid " + themeColors.lightest_grey,
        boxShadow: "none",
      },
      "&:active": {
        border: "0.5px solid " + themeColors.lightest_grey,
        boxShadow: "none",
      }
    };
  },
  singleValue: (provided, state) => {
    return {
      ...provided,
      color: themeColors.dark_grey,
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px"
    }
  },
  menu: (provided) => {
    return {
      ...provided,
      overflowWrap: "anywhere",
    }
  },
  menuList: (provided, state) => {
    return {
      ...provided,
      "&:focused": {
        backgroundColor: themeColors.lightest_red,
        color: themeColors.white,
      }
    };
  },
  placeholder: (provided, state) => {
    return {
      ...provided,
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "24px",
      backgroundColor: themeColors.lightest_grey1,
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isSelected ? themeColors.dark_red : themeColors.white,
      color: state.isSelected ? themeColors.white : themeColors.light_grey,
      borderBottom: (state.data as IWithIsLastProp).isLast ? "none" : "0.5px solid " + themeColors.lightest_grey,
      overflowWrap: "anywhere",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
      "&:hover": {
        backgroundColor: themeColors.lightest_red,
        color: themeColors.white,
      },
      "&:focused": {
        backgroundColor: themeColors.dark_red,
        color: themeColors.white,
      }
    };
  },
}
