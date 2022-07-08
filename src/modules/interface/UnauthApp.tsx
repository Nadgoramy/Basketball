import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import LoginForm from "./loginForm";
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import registerPageImg from "asserts/images/registerWebPage.svg"
import styled from "styled-components";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import ErrorPopUp from "common/components/ErrorPopUp";
import { PageNotFound } from "./PageNotFound";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import { useAppSelector } from "core/redux/store";
import { AppStateType } from "core/redux/configureStore";

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




const UnauthApp : React.FunctionComponent = ()=>{

  const location = useLocation();
  const error = useAppSelector(store => store.error.message)
  const user = useAppSelector((state: AppStateType)=> state.user.currentUser)
  if (user) {
    return <Navigate to='/teams' />;
  }

  return (   
      <StyledContainer>
        <StyledLoginContainer>
        <Routes>            
              <Route path="/" element={<LoginPage/>} />
              <Route
                path="/register"
                element={<RegistrationPage />}
              />            
            <Route path="*" element={<PageNotFound />} />
          </Routes>       
        </StyledLoginContainer>
        {error && <ErrorPopUp errorMessage={error} />}
      </StyledContainer>
  );
}
export default UnauthApp;

