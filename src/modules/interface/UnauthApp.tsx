import React from "react";
import LoginForm from "./loginForm";
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import { StyledFlex } from "common/components/Flex";
import styled from "styled-components";

const StyledContainer = styled.div`{    
    width: 1440px;
}`

const StyledLoginContainer = styled.div`{
    position: absolute;
    width: 606px;
    height: 1024px;
    left: 0px;
    top: 0px;
    background: #FFFFFF;
}`
const StyledImageContainer = styled.div`
    position: absolute;
    width: 834px;
    height: 1024px;
    left: 606px;
    top: 0px;
    background: #F5FBFF;

    img{
        margin: 306px 114px;
    }
`

class UnauthApp extends React.Component {
  render() {
    return (
      <StyledFlex>
        <StyledContainer>
          <StyledLoginContainer>
            <LoginForm />
          </StyledLoginContainer>
          <StyledImageContainer>
            <img src={loginWebPageImg}></img>
          </StyledImageContainer>
        </StyledContainer>
      </StyledFlex>
    );
  }
}

export default UnauthApp;
