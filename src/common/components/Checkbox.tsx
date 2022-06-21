import { theme } from "DefaultTheme";
import React, { LegacyRef } from "react";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  useRef,
  useState,
} from "react";
import styled, { ThemedStyledProps } from "styled-components";

const StyledInput = styled.div`
  position: relative;
  outline-style: none;
  ${(props: InputProps) => (props.width ? "width: " + props.width + ";" : "")}

  input[type="checkbox"] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.grey};
  }

  .checkbox {
    display: inline-block;
    height: 12px;
    width: 12px;
    background: #fff;
    border: 1px solid;
    border-radius: 2px;
    margin-right: 10px;
    border-color: ${({ theme }) => theme.colors.grey};
  }

  .checkbox--active {
    border-color: ${({ theme }) => theme.colors.red};
    background: ${({ theme }) => theme.colors.red};
  }

  &:hover {
    .checkbox {
      border-color: ${({ theme }) => theme.colors.red};
    }
  }
  &[disabled]:hover {
    .checkbox {
      border-color: ${({ theme }) => theme.colors.lightest_grey};
    }
  }
  
  .label--error {
    color: ${({ theme }) => theme.colors.lightest_red};

    .checkbox {
      border-color: ${({ theme }) => theme.colors.lightest_red};
    }
  }
  .label--dasabled {
    color: ${({ theme }) => theme.colors.lightest_grey};    
  }
  .checkbox--active.checkbox--dasabled{
    border-color: ${({ theme }) => theme.colors.lightest_grey};
    background: ${({ theme }) => theme.colors.lightest_grey};
  }
  span.error {
    color: ${({ theme }) => theme.colors.lightest_red};
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    display: block;
  } 
`;

type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  children?: ReactNode;
  label?: string;
  error?: string;
  width?: string;
  value?: string;
  ChangeHandler?: () => void;
} & ReactInputProps;

const Checkbox = React.forwardRef((props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
  const { children, label, error, value, ChangeHandler, disabled, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(value == "true" || false);
  const handleClick = () => {
    if (disabled) return
    setChecked(!checked);
  };
  return (
    <StyledInput
      onClick={() => !disabled && handleClick()}
      className={disabled ? "chb--disabled" : ""}
    >
      <label
        className={`${error ? "label--error" : ""} ${disabled ? "label--dasabled" : ""}`}
        onClick={(e) => {
          !disabled && e.preventDefault();
          handleClick()
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={() => handleClick()}
          {...rest}
        >
          {children}
        </input>
        <svg
          className={`checkbox ${checked ? "checkbox--active" : ""} ${disabled ? "checkbox--dasabled" : ""}`}
          aria-hidden="true"
          viewBox="0 0 12 12"
        >
          <path
            d="M3 6 L5.3 8.3 L9.2 4"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        {label}
      </label>
      {error && <span className="error">{error}</span>}
    </StyledInput>
  );
}
)

export default Checkbox;
