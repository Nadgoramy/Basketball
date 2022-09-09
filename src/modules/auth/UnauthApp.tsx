import React from "react";
import styled from "styled-components";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageNotFound } from "modules/layout/PageNotFound";
import { LoginPage } from "./LoginPage";
import { RegistrationPage } from "./RegistrationPage";
import { useAppSelector } from "core/redux/store";
import { AppStateType } from "core/redux/configureStore";
import { themeColors } from "ThemeColors";
import APIErrorProvider from "common/hooks/apiErrorProvider";

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
  background: ${themeColors.white};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    flex-direction: column;
  }
`;

export const UnauthApp: React.FunctionComponent = () => {
  const user = useAppSelector((store: AppStateType) => store.user.currentUser);

  if (user) {
    return <Navigate to="/teams" replace />;
  }

  return (
    <StyledContainer>
      <APIErrorProvider>
        <StyledLoginContainer>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </StyledLoginContainer>
      </APIErrorProvider>
    </StyledContainer>
  );
};
