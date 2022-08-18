import React from "react";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
  ReactNode,
  Ref,
} from "react";
import styled, { ThemedStyledProps } from "styled-components";
import { ErrorInputSpan } from "../ErrorInputSpan";
import { StyledInputContaner } from "../StyledInputContainer";

type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  children?: ReactNode;
  className?: string;
  error?: string;
  icon?: string;
  width?: string;
} & ReactInputProps;

const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>((props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
  const { children, className, error, icon, ...rest } = props;

  const classnames = `inp ${className} ${error ? "input--error" : ""}`;
  return (
    <StyledInputContaner error={error} icon={icon}>
      <input ref={ref} {...rest} className={classnames}>
        {children}
      </input>
      {error && <ErrorInputSpan title={error}>{error}</ErrorInputSpan>}
      {icon && (
        <div>
          <img src={icon} />
        </div>
      )}
    </StyledInputContaner>
  );
});

export default Input;
