import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";
import { DefaultTheme } from "DefaultTheme";
import { themeColors } from "ThemeColors";

type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type BtnMode = "default" | "add" | "cancel";
type PropsType = {
  mode?: BtnMode;
  theme: DefaultTheme;
} & ReactButtonProps;

const getBackgroundColorByMode = (mode?: string, state?: string) => {
  if (!state) {
    if (mode === "cancel") return themeColors.lightest_grey1;
    return themeColors.red;
  }
  if (state === "hover") {
    if (mode === "cancel") return themeColors.lightest_grey;
    return themeColors.light_red;
  }
  if (state === "active") {
    if (mode === "cancel") return themeColors.light_grey;
    return themeColors.dark_red;
  }
  if (state === "disabled") {
    return themeColors.lightest_grey1;
  }
  return themeColors.red;
};

const getBorderByMode = (mode?: string, state?: string) => {
  if (mode === "add") return "none";
  if (mode === "cancel") {
    if (!state || state == "hover")
      return "1px solid " + themeColors.light_grey;
    return "1px solid " + themeColors.grey;
  }
  return "none";
};

const getColorByMode = (mode?: string, state?: string) => {
  if (mode === "cancel") {
    if (!state || state == "hover") return themeColors.light_grey;
    if (state === "disabled") return themeColors.lightest_grey;
    return themeColors.grey;
  } else if (state === "disabled") return themeColors.lightest_grey;
  return themeColors.white;
};
const getWidth = (props: PropsType) => {
  if (props.mode == "add") return "104px";
  if (props.mode == "cancel") return "171px";
  return "365px";
};

export const StyledButton = styled.button<PropsType>`
  min-width: 104px;
  width: ${(props: PropsType) => getWidth(props)};
  height: 40px;
  font-size: 15px;
  line-height: 24px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  border: ${(props) => getBorderByMode(props.theme, props.mode)};
  background-color: ${(props: PropsType) =>
    getBackgroundColorByMode(props.mode)};
  border-radius: 4px;

  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;

  color: ${(props: PropsType) => getColorByMode(props.mode)};

  &:hover {
    background: #ff5761;
    color: #ffffff;
    border: ${(props: PropsType) => getBorderByMode(props.mode)};
    background-color: ${(props: PropsType) =>
      getBackgroundColorByMode(props.mode, "hover")};
  }

  &:active {
    background: #c60e2e;
    color: ${(props: PropsType) => getColorByMode(props.mode)};
    border: ${(props: PropsType) => getBorderByMode(props.mode)};
    background-color: ${(props: PropsType) =>
      getBackgroundColorByMode(props.mode, "active")};
  }

  &:disabled {
    background: #f6f6f6;
    color: ${(props: PropsType) => getColorByMode(props.mode)};
    border: ${(props: PropsType) => getBorderByMode(props.mode)};
    background-color: ${(props: PropsType) =>
      getBackgroundColorByMode(props.mode, "disabled")};
  }

  #plus {
    font-size: 18px;
  }
`;
