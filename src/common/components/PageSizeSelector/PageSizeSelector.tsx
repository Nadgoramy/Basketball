import React from "react";
import styled from "styled-components";
import {StyledMultiSelect} from "common/components/StyledSelect"
import { ActionMeta, SingleValue } from "react-select";

interface PropType {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
type OptionType = {
  label: string,
  value: number
}
const options=[
  {
    label:"6",
    value:6 
  },
  {
    label:"12",
    value: 12
  },
  {
    label:"24",
    value: 24
  }
]

const StyledPageSizeSelector=styled.select<PropType>`
  height: 40px;
  border: 0.5px solid #D1D1D1;
  border-radius: 4px;
  color: #303030;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  option{
    height: 40px;
    color: #303030;
  }
`

const PageSizeSelector = (props: PropType) => {
  return (
    <StyledPageSizeSelector onChange={props.onChange}>
      <option key="6">6</option>
      <option key="12">12</option>
      <option key="24">24</option>
    </StyledPageSizeSelector>
  );
};
export default PageSizeSelector;
