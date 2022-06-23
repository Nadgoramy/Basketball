import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "modules/interface/SideBar";
import Header from "./Header";
import { TeamsList } from "modules/teams/components/TeamList/teamsList";
import { TeamInfo } from "modules/teams/components/TeamInfo/teamInfo";
import { PlayerList } from "modules/players/components/playerList";
import { PlayerInfo } from "modules/players/components/PlayerInfo"
import MainContainer from "./MainContainer";
import PlayerEdit from "modules/players/components/playerEdit";
import TeamEdit from "modules/teams/components/TeamEdit";
import { PageNotFound } from "./PageNotFound";

type AuthProps = { };
type AuthState = { mobileSideBarOpen: boolean };

const AuthApp: React.FunctionComponent<AuthProps> = (props: AuthProps) =>{
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const toggleMobileSideBar= ()=>{
    setMobileSideBarOpen(!mobileSideBarOpen)
  }
  return (
    <div >
          <Header toggleMobileSideBar={toggleMobileSideBar}/>
          <SideBar isOpen={mobileSideBarOpen}/>

          <MainContainer >
          <Outlet/>
          </MainContainer>
      </div>
  )
}/*<Route path="*" element={<PageNotFound />} /> 


<Routes>
              <Route path="/" element={<TeamsList />}></Route>
              <Route path="/teams" element={<TeamsList />}></Route>
              <Route path={`${path}/team/:id`} element={<TeamInfo />} />
              <Route path={`${path}/edit/:id`} element={<TeamEdit />} />
              <Route path="/player/:id" element={<PlayerInfo />} />
              <Route path="/players" element={<PlayerList />} />
              <Route path="/editPlayer/:id" element={<PlayerEdit/>}/>
              <Route path="/404" element={<PageNotFound/>}/>
              
            </Routes>
            
            */
export default AuthApp;


