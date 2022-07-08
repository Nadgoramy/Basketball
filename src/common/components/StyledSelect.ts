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
      ${( props )=> props.className && props.className.indexOf("pagesizeSelector")>=0 && `
          min-height: 28px;
          min-width: 60px;
          width: 60px;
          height: 28px;
        `
      }
    }
  }
  .pagesizeSelector {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      min-height: 28px;
      height: 28px;
      width: 60px;
    }
  }
.pagesizeSelector .Select__control{
  @media (max-width: ${({ theme }) => theme.mobile}) {
    min-height: 28px;
    min-width: 60px;
    height: 28px;
    width: 60px;
  }
}

  &:invalid{
    border: 0.5px solid ${({ theme }) => theme.colors.red};
  }
  .error{
    border: 0.5px solid ${({ theme }) => theme.colors.red};
  }
 
  .Select__indicator {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      ${( props )=> props.className && props.className.indexOf("pagesizeSelector")>=0 && `          
        width: 24px;
        height: 28px;
        padding: 6px 4px;  
        `
      }
    }
  }

  .Select__input-container{
    @media (max-width: ${({ theme }) => theme.mobile}) {
      ${( props )=> props.className && props.className.indexOf("pagesizeSelector")>=0 && `          
      font-weight: 500;
      font-size: 15px;
      line-height: 24px;
      margin: 0;
      padding: 0;
        `
      }
    }
  }


  .Select__value-container {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      ${( props )=> props.className && props.className.indexOf("pagesizeSelector")>=0 && ` 
      padding: 2px 2px;
      text-align: center;
}
        `
      }
    }
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