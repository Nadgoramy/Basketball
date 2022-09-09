import React from "react";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
} from "react";
import { ErrorInputSpan } from "../ErrorInputSpan";
import { StyledInputContaner } from "../StyledInputContainer";

export type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  error?: string;
  icon?: string;
  iconClick?: Function
} & ReactInputProps;

export const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>((props: InputProps, ref) => {
  const { children, className, error, icon, iconClick, ...rest } = props;

  const classnames = `inp ${className} ${error ? "input--error" : ""}`;
  return (
    <StyledInputContaner error={error} icon={icon}>
      <input ref={ref} {...rest} className={classnames}>
        {children}
      </input>
      {error && <ErrorInputSpan title={error}>{error}</ErrorInputSpan>}
      {icon && (
        <div onClick={() => iconClick?.()}>
          <img src={icon} onClick={() => iconClick?.()} />
        </div>
      )}
    </StyledInputContaner>
  );
});
