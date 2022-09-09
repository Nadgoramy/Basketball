import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "modules/layout/SideBar";
import Header from "./Header";
import { MainContainer, FullScreenContainer } from "./MainContainer";
import { AppStateType } from "core/redux/configureStore";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { userActions } from "core/redux/userSlice";
import { authorizationExpired } from "common/helpers/userCheck";
import APIErrorProvider from "common/hooks/apiErrorProvider";
import { useAPIError } from "common/hooks/useApiError";
import { useCallback } from "react";
import { AuthService } from "api/requests/authService";

export const AuthApp: React.FunctionComponent = () => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const user = useAppSelector((state: AppStateType) => state.user.currentUser);

  const toggleMobileSideBar = useCallback(() => {
    setMobileSideBarOpen(!mobileSideBarOpen);
  }, [mobileSideBarOpen]);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const path = location.pathname;
  const isTeamPage: boolean = path.includes("/team");
  const { removeError } = useAPIError();
  useEffect(() => {
    removeError();
    if (authorizationExpired(user)) {
      dispatch(userActions.removeUser());
      AuthService.clearUser()
    }
  }, [location.pathname]);

  return (
    <FullScreenContainer>
      <APIErrorProvider>
        <Header toggleMobileSideBar={toggleMobileSideBar} />
        <SideBar
          isOpen={mobileSideBarOpen}
          activeItem={isTeamPage ? "team" : "player"}
        />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </APIErrorProvider>
    </FullScreenContainer>
  );
};
