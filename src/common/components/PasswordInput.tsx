import React from "react";
import Input, { InputProps } from "./Input/Input";
import icon from "asserts/icons/eye_rounded.svg";
import hideIcon from "asserts/icons/close_eye_rounded.svg"
import { StyledInputContaner } from "./StyledInputContainer";

const PasswordInput = (props: InputProps, ref: any) => {
    const { children, error, ...rest } = props;
    const [isShown, setIsShown] = React.useState(false);
    return (
        <StyledInputContaner error={error} icon={icon}>
      <input ref={ref} 
      type={isShown ? "text" : "password"}      
      {...rest}>
        {children}
      </input>
      {error && <span >{error}</span>}
      {icon && <div onClick={()=>setIsShown(!isShown)}><img src={isShown ? hideIcon : icon}/></div>}
  </StyledInputContaner>
    );
  };
  export default React.forwardRef(PasswordInput);