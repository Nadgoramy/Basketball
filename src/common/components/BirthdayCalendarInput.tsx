import styled from "styled-components";
import DatePicker, {
  CalendarContainer,
  ReactDatePickerProps,
} from "react-datepicker";
import { forwardRef } from "react";
import { Input, InputProps } from "./Input/Input";
import calendarSvg from "asserts/icons/calendar-blank.svg";
import "react-datepicker/dist/react-datepicker.css";
import { themeColors } from "ThemeColors";
import React from "react";
const borderProp = (props: any) => {
  if (props.error) return "1px solid " + themeColors.lightest_red;
  if (props.icon) return "0.5px solid #" + themeColors.lightest_grey;
  return "none";
};

export const StyledCalendar = styled(DatePicker)`
  border-radius: 4px;
  border-width: 0;
  background: ${themeColors.lightest_grey1};
  color: ${themeColors.dark_grey};
  border: ${(props) => borderProp(props)};
  box-shadow: none;
  flex: auto;
  width: -moz-available;

  position: relative;
  min-width: 150px;
  height: 40px;
  outline-style: none;
  left: 0;
  right: 0;
  width: -moz-available;

  .react-datepicker__day--selected {
    color: ${themeColors.white};
    background-color: ${themeColors.red};
  }

  .react-datepicker {
    max-width: 366px;
    background-color: ${themeColors.white};
    color: ${themeColors.grey};
    font-family: ${({ theme }) => theme.font};
  }

  div {
    position: relative;
    min-width: 150px;
    height: 40px;
    outline-style: none;
  }
  input {
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    width: -moz-available;
    padding: 0;
    padding-left: 12px;

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
  &:hover {
    color: ${themeColors.dark_grey};
    background: ${themeColors.lightest_grey};
    outline-style: none;
  }
  &:active {
    color: ${themeColors.dark_grey};
    outline-style: none;
  }
  &:focus {
    background: ${themeColors.lightest_grey1};
    box-shadow: 0px 0px 5px #d9d9d9;
    color: ${themeColors.dark_grey};
    outline-style: none;
  }
  &:disabled {
    background: ${themeColors.lightest_grey};
    color: ${themeColors.lightest_grey};
  }
  .error {
    border: ${(props) => borderProp(props)};
  }
  .inputStyle {
    background-color: green;

    input {
      position: absolute;
      left: 0;
      right: 0;
      height: 40px;
      width: -moz-available;
      padding: 0;
      padding-left: 12px;

      border-radius: 4px;
      border-width: 0;
      background: ${themeColors.lightest_grey1};
      color: ${themeColors.dark_grey};
      border: ${(props) => borderProp(props)};
      box-shadow: none;
    }
  }
`;

const CustomCalendarContainerStyled = styled.div`
  border: 1px solid ${themeColors.light_grey};
  background-color: ${themeColors.white};
  border-radius: 0.3rem;
  display: inline-block;
  position: relative;
  color: ${themeColors.dark_grey};

  .customColor,
  .react-datepicker__day--selected {
    background-color: ${themeColors.red};
    color: ${themeColors.white};
  }
  .customColor,
  .react-datepicker__day--keyboard-selected {
    background-color: ${themeColors.lightest_red};
    color: ${themeColors.white};
  }
`;

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>>((props: InputProps, forwardRef: any) => {
    const innerRef = React.createRef<HTMLInputElement>();
    React.useImperativeHandle(forwardRef, () => innerRef?.current);
    const onIconClick = () => innerRef.current?.click();

    return (
      <Input
        icon={calendarSvg}
        onClick={props.onClick}
        iconClick={() => onIconClick()}
        onChange={props.onChange}
        ref={innerRef}
        id={props.id}
        value={props.value}
        error={props.error}
      />
    );
  });

const CustomCalendarContainer = (props: any) => {
  const { className, children } = props;
  return (
    <CustomCalendarContainerStyled>
      <CalendarContainer className={className + "customColor"}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </CustomCalendarContainerStyled>
  );
};

interface CustomDatePickerProps extends ReactDatePickerProps {
  error?: string;
}

export const BirthdayCalendarInput = forwardRef((props: CustomDatePickerProps, ref: any) => {
  const { selected, onChange, error, ...rest } = props;

  const lessthenToday = (date: Date) => {
    return date.valueOf() < Date.now();
  };

  return (
    <StyledCalendar
      selected={selected}
      onChange={onChange}
      {...rest}
      ref={ref}
      filterDate={lessthenToday}
      wrapperClassName="inputStyle"
      customInput={<CustomInput error={error} />}
      calendarContainer={CustomCalendarContainer}
    />
  );
});

