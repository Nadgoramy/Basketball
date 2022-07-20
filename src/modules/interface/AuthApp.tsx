import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "modules/interface/SideBar";
import Header from "./Header";
import { MainContainer, FullScreenContainer } from "./MainContainer";
import { AppStateType } from "core/redux/configureStore";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import ErrorPopUp from "common/components/ErrorPopUp";
import { errorActions } from "core/redux/errorSlice";
import { userActions } from "core/redux/userSlice";

type AuthProps = {};
type AuthState = { mobileSideBarOpen: boolean };

const AuthApp: React.FunctionComponent<AuthProps> = (props: AuthProps) => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const globalError = useAppSelector(
    (store: AppStateType) => store.error.message
  );
  const user = useAppSelector((state: AppStateType) => state.user.currentUser);

  
  const toggleMobileSideBar = () => {
    setMobileSideBarOpen(!mobileSideBarOpen);
  };
  const location = useLocation();
  const dispatch = useAppDispatch();
  let path = location.pathname;
  let isTeamPage: boolean = path.includes("/team");
  
  useEffect(()=>{
    dispatch(errorActions.clearErrorMessage())

    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
        dispatch(userActions.removeUser())
      }
    }
  }, [location.pathname])

  const parseJwt = (token:string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  
  return (
    <FullScreenContainer>
      <Header toggleMobileSideBar={toggleMobileSideBar} />
      <SideBar
        isOpen={mobileSideBarOpen}
        activeItem={isTeamPage ? "team" : "player"}
      />

      <MainContainer>
        <Outlet />
      </MainContainer>
      {globalError && <ErrorPopUp errorMessage={globalError} />}
    </FullScreenContainer>
  );
};
export default AuthApp;
