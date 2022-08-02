import styled from "styled-components";
import { InputProps } from "./Input/Input";

const borderProp = (props: any) => {
  if (props.error) return "1px solid " + props.theme.colors.lightest_red;
  if (props.icon) return "0.5px solid #" + props.theme.colors.lightest_grey;
  return "none";
};

export const StyledInputContaner = styled.div<InputProps>`
  position: relative;
  min-width: 50px;
  height: 40px;
  outline-style: none;
  ${(props: any) => (props.width ? "width: " + props.width + ";" : "")}
  font: ${({ theme }) => theme.font};

  input {
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    width: -moz-available;
    padding: 0 12px;
    ${(props: InputProps) => (props.icon ? "padding-right: 28px;" : "")}

    border-radius: 4px;
    border-width: 0;
    background: ${({ theme }) => theme.colors.lightest_grey1};
    color: ${({ theme }) => theme.colors.dark_grey};
    border: ${(props) => borderProp(props)};
    box-shadow: none;
  }
  input:-internal-autofill-selected {
    background: ${({ theme }) => theme.colors.lightest_grey1};
  }
  input:hover {
    color: ${({ theme }) => theme.colors.dark_grey};
    background: ${({ theme }) => theme.colors.lightest_grey};
    outline-style: none;
  }
  input:active {
    color: ${({ theme }) => theme.colors.dark_grey};
    outline-style: none;
  }
  input:focus {
    background: ${({ theme }) => theme.colors.lightest_grey1};
    box-shadow: 0px 0px 5px #d9d9d9;
    color: ${({ theme }) => theme.colors.dark_grey};
    outline-style: none;
  }
  input:disabled {
    background: ${({ theme }) => theme.colors.lightest_grey};
    color: ${({ theme }) => theme.colors.lightest_grey};
  }
  .input--error {
    border: ${(props) => borderProp(props)};
  }

  span {
    position: absolute;
    top: 42px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.lightest_red};
    padding-top: 2px;
  }

  div {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px 12px;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;
