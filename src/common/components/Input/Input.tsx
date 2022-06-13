import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const borderProp=(props:InputProps)=>{
  if(props.error) return "1px solid #D1D1D1";
  if(props.icon) return "0.5px solid #D1D1D1";
  return "none";
}

const StyledInput = styled.div`
position:relative;
min-width: 364px;
${( props:InputProps)  => props.width ? "width: "+props.width + ";" : "" }

input{
  width: 100%;
  height: 40px;  
  border-radius: 4px;
  background: #F6F6F6;
  color: #303030;
  border: ${( props:InputProps)  => borderProp(props)};
  box-shadow: none;
}
input:hover{
  color: #303030;
  background: #D1D1D1;
  box-shadow: 0px 0px 5px #D9D9D9;
}
input:active{
  color: #303030;
}
input:focus{
  background: #F6F6F6;
  box-shadow: 0px 0px 5px #D9D9D9;
  color: #303030;
}
input:disabled{
  background: #F6F6F6;
  color: #D1D1D1;
}

span{
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;

  color: #FF768E;
  padding-top: 2px;
}

div{
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 12px;
}
img{
  width: 16px;
  height: 16px;
}
`
type ReactInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputProps = {
  children?: ReactNode;
  className?: string;
  error?: string;
  icon?: string;
  width?: string;
} & ReactInputProps;

const Input: React.FunctionComponent<InputProps> = (props: InputProps): JSX.Element => {
  const { children, className, error, icon,  ...rest } = props;
    
  const classnames = `inp ${className}`;
  return (
      <StyledInput>
        <input
        {...rest} 
        className={classnames}
        >
        {children}
        </input>
        {error && <span >{error}</span>}
        {icon && <div><img src={icon}/></div>}
    </StyledInput>
  );
};

export default Input;