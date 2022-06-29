import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "modules/interface/SideBar";
import Header from "./Header";
import MainContainer from "./MainContainer";
import { AppStateType } from "core/redux/configureStore";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import ErrorPopUp from "common/components/ErrorPopUp";
import { errorActions } from "core/redux/errorSlice";

type AuthProps = {};
type AuthState = { mobileSideBarOpen: boolean };

const AuthApp: React.FunctionComponent<AuthProps> = (props: AuthProps) => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const globalError = useAppSelector(
    (store: AppStateType) => store.error.message
  );
  const dispatch = useAppDispatch();
  const toggleMobileSideBar = () => {
    setMobileSideBarOpen(!mobileSideBarOpen);
  };
  const location = useLocation();
  let path = location.pathname;
  let isTeamPage: boolean = path.includes("/team");

  useEffect(() => {
    if (globalError > "") {
      setTimeout(() => {
        dispatch(errorActions.clearErrorMessage());
      }, 15000);
    }
  }, [globalError]);

  return (
    <div>
      <Header toggleMobileSideBar={toggleMobileSideBar} />
      <SideBar
        isOpen={mobileSideBarOpen}
        activeItem={isTeamPage ? "team" : "player"}
      />

      <MainContainer>
        <Outlet />
      </MainContainer>
      {globalError && <ErrorPopUp errorMessage={globalError} />}
    </div>
  );
};
export default AuthApp;
