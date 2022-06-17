import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
color: ${({theme})=> theme.colors.red};
font-weight: 500;
font-size: 14px;
line-height: 24px;

&:disabled{
    color: ${({theme})=> theme.colors.lightest_grey};
}
`