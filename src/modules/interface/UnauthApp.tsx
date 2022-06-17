import React from "react";
import LoginForm from "./loginForm";
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import styled from "styled-components";

const StyledContainer = styled.div`{    
    width: 1440px;
    display: flex;
    flex-direction: row;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      display: flex;
    flex-direction: column;
    }
}`

const StyledLoginContainer = styled.div`{
    position: absolute;
    width: 606px;
    height: 100%;
    left: 0px;
    top: 0px;
    background: ${({ theme }) => theme.colors.white};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;    

    }
}`
const StyledImageContainer = styled.div`
    position: absolute;
    width: 834px;
    height: 1024px;
    left: 606px;
    top: 0px;
    background: #F5FBFF;
    background-image: url('${loginWebPageImg}');
    background-repeat: no-repeat;
    background-size: contain;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      dispplay: none;
      position: relative;
      width: 100%px;
      width: 1px;
      height: 1px;
      left: 0px;
      top: 0px;
    }

    img{
        margin: 306px 114px;
    }
`

class UnauthApp extends React.Component {
  render() {
    return (
        <StyledContainer>
          <StyledLoginContainer>
            <LoginForm />
          </StyledLoginContainer>
          <StyledImageContainer />
        </StyledContainer>
    );
  }
}

export default UnauthApp;
