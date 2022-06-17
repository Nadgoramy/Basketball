import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "modules/interface/SideBar";
import Header from "./Header";
import { TeamsList } from "modules/teams/components/TeamList/teamsList";
import { TeamInfo } from "modules/teams/components/TeamInfo/teamInfo";
import { PlayerList } from "modules/players/components/playerList";
import { PlayerInfo } from "modules/players/components/PlayerInfo"
import MainContainer from "./MainContainer";
import PlayerEdit from "modules/players/components/playerEdit";

type AuthProps = { };
type AuthState = { mobileSideBarOpen: boolean };

const AuthApp: React.FunctionComponent<AuthProps> = (props: AuthProps) =>{
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const toggleMobileSideBar= ()=>{
    setMobileSideBarOpen(!mobileSideBarOpen)
  }

  return (
    <div >
        <BrowserRouter>
          <Header toggleMobileSideBar={toggleMobileSideBar}/>
          <SideBar isOpen={mobileSideBarOpen}/>

          <MainContainer >
            <Routes>
              <Route path="/" element={<TeamsList />}></Route>
              <Route path="/teams" element={<TeamsList />}></Route>
              <Route path="/team/:id" element={<TeamInfo />} />
              <Route path="/player/:id" element={<PlayerInfo />} />
              <Route path="/players" element={<PlayerList />} />
              <Route path="/editPlayer/:id" element={<PlayerEdit/>}/>
            </Routes>
          </MainContainer>
        </BrowserRouter>
      </div>
  )
}

export default AuthApp;
