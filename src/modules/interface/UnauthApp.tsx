import React from "react";
import loginWebPageImg from "asserts/images/loginWebPage.svg";
import registerPageImg from "asserts/images/registerWebPage.svg";
import styled from "styled-components";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorPopUp from "common/components/ErrorPopUp";
import { PageNotFound } from "./PageNotFound";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import { useAppSelector } from "core/redux/store";
import { AppStateType } from "core/redux/configureStore";

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledLoginContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    flex-direction: column;
  }
`;

const UnauthApp: React.FunctionComponent = () => {
  const error = useAppSelector((store) => store.error.message);
  const user = useAppSelector((state: AppStateType) => state.user.currentUser);
  if (user) {
    return <Navigate to="/teams" replace />;
  }

  return (
    <StyledContainer>
      <StyledLoginContainer>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </StyledLoginContainer>
      {error && <ErrorPopUp errorMessage={error} />}
    </StyledContainer>
  );
};
export default UnauthApp;
