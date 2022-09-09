import React, { LegacyRef } from "react";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { themeColors } from "ThemeColors";
import { ReactInputProps } from "./Input/Input";

const StyledInput = styled.div`
  position: relative;
  outline-style: none;
  ${(props: any) => (props.width ? "width: " + props.width + ";" : "")}

  input[type="checkbox"] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    cursor:pointer;
  }

  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${themeColors.grey};
    cursor:pointer;
  }

  .checkbox {
    display: inline-block;
    margin-left: 2px;
    height: 10px;
    width: 10px;
    background: #fff;
    border: 1px solid;
    border-radius: 2px;
    margin-right: 8px;
    border-color: ${themeColors.grey};
    cursor:pointer;
  }

  .checkbox--active {
    border-color: ${themeColors.red};
    background: ${themeColors.red};
  }

  &:hover {
    .checkbox {
      border-color: ${themeColors.red};
    }
  }
  &[disabled]:hover {
    .checkbox {
      border-color: ${themeColors.lightest_grey};
    }
  }

  .label--error {
    color: ${themeColors.lightest_red};

    .checkbox {
      border-color: ${themeColors.lightest_red};
    }
  }
  .label--dasabled {
    color: ${themeColors.lightest_grey};
  }
  .checkbox--active.checkbox--dasabled {
    border-color: ${themeColors.lightest_grey};
    background: ${themeColors.lightest_grey};
  }
  span.error {
    color: ${themeColors.lightest_red};
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    display: block;
  }
`;

export type InputProps = {
  label?: string;
  error?: string;
  initialValue: boolean;
  value?: string;
} & ReactInputProps;

export const Checkbox = React.forwardRef(
  (props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
      children,
      label,
      error,
      initialValue = false,
      disabled,
      onChange,
      value,
      ...rest
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const [checked, setChecked] = useState(initialValue);

    const handleClick = () => {
      if (disabled) return;

      setChecked(!checked);
    };
    return (
      <StyledInput
        onClick={() => handleClick()}
        className={disabled ? "chb--disabled" : ""}
      >
        <label
          className={`${error ? "label--error" : ""} ${disabled ? "label--dasabled" : ""
            }`}
        >
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              e.preventDefault();
              setChecked(!e.target.checked);
              if (onChange) onChange(e);
            }}
            value={checked ? "true" : "false"}
            {...rest}
          >
            {children}
          </input>
          <svg
            className={`checkbox ${checked ? "checkbox--active" : ""} ${disabled ? "checkbox--dasabled" : ""
              }`}
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
);
