import React from "react";

interface PropType {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const PageSizeSelector = (props: PropType) => {
  return (
    <select onChange={props.onChange}>
      <option key="6">6</option>
      <option key="12">12</option>
      <option key="24">24</option>
    </select>
  );
};
export default PageSizeSelector;
