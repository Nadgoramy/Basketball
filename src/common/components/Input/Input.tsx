import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import styled, { ThemedStyledProps } from "styled-components";

const borderProp=(props: any)=>{
  if(props.error) return "1px solid " +props.theme.colors.lightest_grey;
  if(props.icon) return "0.5px solid #" +props.theme.colors.lightest_grey;
  return "none";
}

const StyledInput = styled.div`
position:relative;
min-width: 300px;
outline-style: none;
${( props:InputProps)  => props.width ? "width: "+props.width + ";" : "" }

input{
  width: 100%;
  height: 40px;  
  border-radius: 4px;
  background: ${({theme})=> theme.colors.lightest_grey1};
  color: ${({theme})=> theme.colors.dark_grey};
  border: ${( props:InputProps)  => borderProp(props)};
  box-shadow: none;
}
input:hover{
  color: ${({theme})=> theme.colors.dark_grey};
  background: ${({theme})=> theme.colors.lightest_grey};
  outline-style: none;
}
input:active{
  color: ${({theme})=> theme.colors.dark_grey};
  outline-style: none;
}
input:focus{
  background: ${({theme})=> theme.colors.lightest_grey1};
  box-shadow: 0px 0px 5px #D9D9D9;
  color: ${({theme})=> theme.colors.dark_grey};
  outline-style: none;
}
input:disabled{
  background: ${({theme})=> theme.colors.lightest_grey};
  color: ${({theme})=> theme.colors.lightest_grey};
}

span{
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;

  color: ${({theme})=> theme.colors.lightest_red};
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

//type ThemeProps<P> = ThemedStyledProps<P, DefaultTheme>;
//type InputProps = ThemeProps<IInputProps> & ReactInputProps;
type ReactInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputProps = {
  children?: ReactNode
  className?: string
  error?: string
  icon?: string
  width?: string
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