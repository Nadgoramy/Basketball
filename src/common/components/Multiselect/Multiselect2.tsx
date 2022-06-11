import { string } from "prop-types";
import React from "react";
import { components, ControlProps, GroupBase, InputActionMeta, MultiValue, OptionProps } from "react-select";
import Select, { Props } from "react-select/dist/declarations/src/Select";

const Control = ({ children, ...props } : ControlProps) => (
    <components.Control {...props} isMulti={true}>
      👍 {children}
    </components.Control>
  );
  
  //const GoodSelect = (props: Props<Option: OptionProps, IsMulti: boolean, Group: GroupBase<Option: OptionProps>>) => <Select {...props} components={{ Control }} />
  