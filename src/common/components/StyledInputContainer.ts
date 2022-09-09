import styled from "styled-components";
import { themeColors } from "ThemeColors";
import { InputProps } from "./Input/Input";

const borderProp = (props: any) => {
  if (props.error) return "1px solid " + themeColors.lightest_red;
  if (props.icon) return "0.5px solid #" + themeColors.lightest_grey;
  return "none";
};
const borderWidth = (props: any) => {
  if (props.error) return 1;
  if (props.icon) return 0.5;
  return 0;
};

export const StyledInputContaner = styled.div<InputProps>`
  position: relative;
  min-width: 50px;
  height: ${(props: InputProps) => (props.error ? "64px" : "40px")};
  outline-style: none;
  ${(props: InputProps) => (props.width ? "width: " + props.width + ";" : "")}
  font: ${({ theme }) => theme.font};

  input {
    position: absolute;
    left: 0;
    right: 0;
    height: ${(props: InputProps) => `${40 - 2 * borderWidth(props)}px;`};
    width: -moz-available;
    padding: 0 12px;
    ${(props: InputProps) => (props.icon ? "padding-right: 28px;" : "")}

    border-radius: 4px;
    border-width: 0;
    background: ${themeColors.lightest_grey1};
    color: ${themeColors.dark_grey};
    border: ${(props) => borderProp(props)};
    box-shadow: none;
  }
  input:-internal-autofill-selected {
    background: ${themeColors.lightest_grey1};
  }
  input:hover {
    color: ${themeColors.dark_grey};
    background: ${themeColors.lightest_grey};
    outline-style: none;
  }
  input:active {
    color: ${themeColors.dark_grey};
    outline-style: none;
  }
  input:focus {
    background: ${themeColors.lightest_grey1};
    box-shadow: 0px 0px 5px #d9d9d9;
    color: ${themeColors.dark_grey};
    outline-style: none;
  }
  input:disabled {
    background: ${themeColors.lightest_grey};
    color: ${themeColors.lightest_grey};
  }
  .input--error {
    border: ${(props) => borderProp(props)};
  }

  span {
    position: absolute;
    top: 40px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: ${themeColors.lightest_red};
    padding-top: 2px;
  }

  div {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px 12px;
    cursor:pointer;
  }
  img {
    width: 16px;
    height: 16px;
    cursor:pointer;
  }
`;
