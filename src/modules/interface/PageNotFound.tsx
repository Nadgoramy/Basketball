import styled from "styled-components";
import image from "asserts/images/404.svg";
import { StyledFlex } from "common/components/Flex";

const NoPageStyled = styled.div`
position: absolute;
top:0;
left:0;
width: 100%;
height:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: auto;

.innerDiv{
    align-self: center;
}
.image{
    width: 380px;
    height: 212px;
    bakground-image: url("${image}");
    background-repeat: no-repeat;
    background-size: contain;
    margin: auto;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 285px;
        height: 130px;
    }
}
h2{
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;
    text-align: center;
    margin-tip: 48px;
    color: ${({ theme }) => theme.colors.lightest_red};
    @media (max-width: ${({ theme }) => theme.mobile}) {
        font-size: 17px;
        line-height: 25px;
    }
}
span{
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    color: ${({ theme }) => theme.colors.grey};
    @media (max-width: ${({ theme }) => theme.mobile}) {
        font-size: 15px;
    line-height: 24px;
}
`


export const PageNotFound : React.FunctionComponent=()=>{
    return(
        <NoPageStyled >
            <StyledFlex direction="column" className="innerDiv">
                <div className="image"></div>
                <h2>Page not found</h2>
                <span>Sorry, we can`t find what you`re looking for</span>
                </StyledFlex>
        </NoPageStyled>
    );
}