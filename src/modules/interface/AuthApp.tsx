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
import { authorizationExpired } from "common/helpers/userCheck";

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

    if (authorizationExpired(user)) {      
        dispatch(userActions.removeUser())      
    }
  }, [location.pathname])

  
  
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
