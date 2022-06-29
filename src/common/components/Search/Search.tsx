import Input, { InputProps } from "../Input/Input";
import icon from "asserts/icons/search_rounded.svg";
import styled from "styled-components";
import React, { ForwardedRef, LegacyRef, Ref } from "react";

const StyledContainer = styled.div`
&>div{
  min-width:366px;

}

input:active {
  border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  outline-width: 0;
  box-shadow: none;
}

input:enabled {
  outline-width: 0;
  border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  box-shadow: none;
}
input:focus {
  outline-width: 0;
  border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  box-shadow: none;
}
input:visited {
  outline-width: 0;
  border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  box-shadow: none;
}


`
const StyledSearch = styled(Input)`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
  border-radius: 4px;
  outline-width: 0;
 
  .search-container{
    min-width: 366px;
  }
  
  &:active {
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    outline-width: 0;
    box-shadow: none;
  }

  &:enabled {
    outline-width: 0;
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }
  &:focus {
    outline-width: 0;
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }
  &:visited {
    outline-width: 0;
    border: 0.5px solid ${({ theme }) => theme.colors.lightest_grey};
    box-shadow: none;
  }
`;

const Search = (props: InputProps, ref: any) => {
  const { children, ...rest } = props;
  return (
    <StyledContainer>
    <Input ref={ref} 
    placeholder="Search..." 
    icon={icon} 
    className="search-container"  
    width="366px" 
    {...rest} >
      {children}
    </Input>
    </StyledContainer>
  );
};
export default React.forwardRef(Search);
