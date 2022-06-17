import Input, { InputProps } from "../Input/Input";
import icon from "asserts/icons/search_rounded.svg"
import styled from "styled-components";

const StyledSearch= styled(Input)<InputProps>`
    background: ${({theme})=> theme.colors.white};
    border: 0.5px solid ${({theme})=> theme.colors.lightest_grey};
    border-radius: 4px;
    outline-width: 0;  

    &:active{
        border: 0.5px solid ${({theme})=> theme.colors.lightest_grey};
        outline-width: 0;  
        box-shadow: none;
    }

    &:enabled{
        outline-width: 0;  
        border: 0.5px solid ${({theme})=> theme.colors.lightest_grey};
        box-shadow: none;
    }
    &:focus{
        outline-width: 0;  
        border: 0.5px solid ${({theme})=> theme.colors.lightest_grey};
        box-shadow: none;
    }
    &:visited{
        outline-width: 0;  
        border: 0.5px solid ${({theme})=> theme.colors.lightest_grey};
        box-shadow: none;
    }
`

const Search : React.FC<InputProps> = (props:InputProps)=>{   
    const { children,  ...rest } = props;  
        return(
            <Input placeholder="Search..." icon={icon} {...rest}>{children}</Input>
        );
   
}
export default Search;