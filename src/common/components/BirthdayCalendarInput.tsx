import styled from "styled-components";
import DatePicker, {
  CalendarContainer,
  ReactDatePickerProps,
} from "react-datepicker";
import React, { forwardRef, Ref, useState } from "react";
import Input from "./Input/Input";
import calendarSvg from "asserts/icons/calendar-blank.svg";
import "react-datepicker/dist/react-datepicker.css";

const borderProp = (props: any) => {
  if (props.error) return "1px solid " + props.theme.colors.lightest_red;
  if (props.icon) return "0.5px solid #" + props.theme.colors.lightest_grey;
  return "none";
};

export const StyledCalendar = styled(DatePicker)`
  border-radius: 4px;
  border-width: 0;
  background: ${({ theme }) => theme.colors.lightest_grey1};
  color: ${({ theme }) => theme.colors.dark_grey};
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
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.red};
  }

  .react-datepicker {
    max-width: 366px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grey};
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
    background: ${({ theme }) => theme.colors.lightest_grey1};
    color: ${({ theme }) => theme.colors.dark_grey};
    border: ${(props) => borderProp(props)};
    box-shadow: none;
  }
  input:-internal-autofill-selected {
    background: ${({ theme }) => theme.colors.lightest_grey1};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.dark_grey};
    background: ${({ theme }) => theme.colors.lightest_grey};
    outline-style: none;
  }
  &:active {
    color: ${({ theme }) => theme.colors.dark_grey};
    outline-style: none;
  }
  &:focus {
    background: ${({ theme }) => theme.colors.lightest_grey1};
    box-shadow: 0px 0px 5px #d9d9d9;
    color: ${({ theme }) => theme.colors.dark_grey};
    outline-style: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.lightest_grey};
    color: ${({ theme }) => theme.colors.lightest_grey};
  }
  .error {
    border: ${(props) => borderProp(props)};
  }
  .inputStyle {
    background-color: green;
    
    input{
      position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    width: -moz-available;
    padding: 0; 
    padding-left: 12px;   

    border-radius: 4px;
    border-width: 0;
    background: ${({ theme }) => theme.colors.lightest_grey1};
    color: ${({ theme }) => theme.colors.dark_grey};
    border: ${(props) => borderProp(props)};
    box-shadow: none;
    }
  }
`;

const CustomCalendarContainerStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.light_grey};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.3rem;
  display: inline-block;
  position: relative;
  color: ${({ theme }) => theme.colors.dark_grey};

  .customColor,
  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
  }
  .customColor, .react-datepicker__day--keyboard-selected{
    background-color: ${({ theme }) => theme.colors.lightest_red};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CustomInput = forwardRef((props: any, ref: Ref<HTMLInputElement>) => (
  <Input
    icon={calendarSvg}
    onClick={props.onClick}
    onChange={props.onChange}
    ref={ref}
    id={props.id}
    value={props.value}
    error={props.error}
  />
));

const CustomCalendarContainer = (props: any) => {
  let { className, children } = props;
  return (
    <CustomCalendarContainerStyled>
      <CalendarContainer className={className + "customColor"}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </CustomCalendarContainerStyled>
  );
};

interface CustomDatePickerProps extends ReactDatePickerProps{
  error:string | undefined
}

const BirthdayCalendarInput = (props: CustomDatePickerProps, ref: any) => {
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
      customInput={<CustomInput error={error}/>}
      calendarContainer={CustomCalendarContainer}
    />
  );
};
export default React.forwardRef(BirthdayCalendarInput);
