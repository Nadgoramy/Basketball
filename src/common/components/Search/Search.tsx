import Input, { InputProps } from "../Input/Input";
import icon from "asserts/icons/search_rounded.svg"
import styled from "styled-components";

const StyledSearch= styled(Input)<InputProps>`
    background: #FFFFFF;
    border: 0.5px solid #D1D1D1;
    border-radius: 4px;
`

const Search : React.FC<InputProps> = (props:InputProps)=>{   
    const { children,  ...rest } = props;  
        return(
            <Input placeholder="Search..." icon={icon} {...rest}>{children}</Input>
        );
   
}
export default Search;