import React from "react";
import { shallowEqual } from "react-redux";
import styled from "styled-components";
import { OptionTypeValueNumber, SingleSelectCustomStyles, StyledSelect } from "../StyledSelect";

const options: OptionTypeValueNumber[] = [
  {
    label: "6",
    value: 6,
  },
  {
    label: "12",
    value: 12,
  },
  {
    label: "24",
    value: 24,
  },
];

const StyledPageSizeSelector = styled(StyledSelect)`
.Select__control {
    @media (max-width: ${({ theme }) => theme.mobile}) {    
        min-height: 28px;
        min-width: 60px;
        width: 60px;
        height: 28px;          
    }
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    min-height: 28px;
    height: 28px;
    width: 60px;
  }
 
.Select__indicator {
  align-items: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {          
      width: 24px;
      height: 28px;
      align-items: center;
      }
  }

.Select__input-container {
  align-items: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {    
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    margin: 0;
    padding: 0;
      
  }
}
.Select__option {  
  height: 40px; 
}
.Select__value-container {
  @media (max-width: ${({ theme }) => theme.mobile}) {    
    padding: 2px 2px;
    text-align: center;
  }
}
.Select__single-value{
  text-align: center;
}
.Select__input{
  text-align: center;
}

`;
interface PageSizeSelectorPropType {
  onChange: (a: any, b: any) => void;
  value: number;
}
const PageSizeSelector = (props: PageSizeSelectorPropType) => {
  return (
    <StyledPageSizeSelector
      border={true}
      classNamePrefix="Select"
      className="pagesizeSelector"
      styles={SingleSelectCustomStyles}
      options={options.map(x => {
        options.indexOf(x) === options.length - 1 ? x.isLast = true : x.isLast = false;
        return x;
      })}
      defaultValue={options[0]}
      onChange={props.onChange}
      menuPlacement="auto"
      isSearchable={false}
      value={options.filter(
        ({ value }) => value === props.value
      )}
    />
  );
};

export default React.memo(PageSizeSelector, shallowEqual);