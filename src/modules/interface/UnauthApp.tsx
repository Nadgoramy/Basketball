import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import LoginForm from "./loginForm";
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import registerPageImg from "asserts/images/registerWebPage.svg"
import styled from "styled-components";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import ErrorPopUp from "common/components/ErrorPopUp";
import { PageNotFound } from "./PageNotFound";

const StyledContainer = styled.div`
   {
    width: 1440px;
    display: flex;
    flex-direction: row;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

const StyledLoginContainer = styled.div`
   {
    position: absolute;
    width: 606px;
    height: 100%;
    left: 0px;
    top: 0px;
    background: ${({ theme }) => theme.colors.white};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }
`;


const StyledLoginImageContainer = styled.div`
  position: absolute;
  margin: 305px 114px;
  width: 605px;
  height: 1024px;
  left: 606px;
  top: 0px;
  background: #f5fbff;
  background-image: url("${(props)=>loginWebPageImg }");
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
  img {
    margin: 306px 114px;
  }
`;
const StyledRegisterImageContainer = styled.div`
  position: absolute;
  margin: 305px 87px;
  width: 660px;
  height: 1024px;
  left: 606px;
  top: 0px;
  background: #f5fbff;
  background-image: url("${(props) => registerPageImg }");
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
  img {
    margin: 306px 114px;
  }
`;

const UnauthApp : React.FunctionComponent = ()=>{
const location = useLocation();
const [isRegisterPage, setIsRegisterPage] = useState(false);
const [error, setError] = useState("");
useEffect(() => {
  setIsRegisterPage(location.pathname !== "/");
}, [location]);

  return (   
      <StyledContainer>
        <StyledLoginContainer>
        <Routes>            
              <Route path="/" element={<LoginForm setError={setError} />} />
              <Route
                path="/register"
                element={<RegistrationForm setError={setError} />}
              />            
            <Route path="*" element={<PageNotFound />} />
          </Routes>       
        </StyledLoginContainer>
        { isRegisterPage ? <StyledRegisterImageContainer /> : <StyledLoginImageContainer /> }
        {error && <ErrorPopUp errorMessage={error} />}
      </StyledContainer>
  );
}
export default UnauthApp;

