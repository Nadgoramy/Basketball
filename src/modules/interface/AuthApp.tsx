import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import SideBar from "modules/interface/SideBar";
import Header from "./Header";
import { TeamsList } from "modules/teams/components/teamsList";
import { TeamInfo } from "modules/teams/components/teamInfo";
import { PlayerList } from "modules/players/components/playerList";
import { PlayerInfo } from "modules/players/components/PlayerInfo"
import MainContainer from "./MainContainer";
import PlayerEdit from "modules/players/components/playerEdit";
import TeamEdit from "modules/teams/components/TeamEdit";
import { PageNotFound } from "./PageNotFound";
import Test from "modules/teams/components/TeamTest";

type AuthProps = { };
type AuthState = { mobileSideBarOpen: boolean };

const AuthApp: React.FunctionComponent<AuthProps> = (props: AuthProps) =>{
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const toggleMobileSideBar= ()=>{
    setMobileSideBarOpen(!mobileSideBarOpen)
  }
  const location = useLocation();
  let path = location.pathname;
  let isTeamPage : boolean = path.includes("/team") 
  return (
    <div >
          <Header toggleMobileSideBar={toggleMobileSideBar}/>
          <SideBar isOpen={mobileSideBarOpen} activeItem={isTeamPage ? "team" : "player"}/>

          <MainContainer >
          <Outlet/>
          </MainContainer>
          
      </div>
  )
}
export default AuthApp;


