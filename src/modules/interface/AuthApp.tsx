import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PlayerList } from "modules/players/components/playerList";
import SideBar from "modules/interface/SideBar";
import Header from "./Header";
import { TeamsList } from "modules/teams/components/TeamList/teamsList";
import { TeamInfo } from "modules/teams/components/TeamInfo/teamInfo";
import MainContainer from "./MainContainer";


type AuthProps = { };
type AuthState = { mobileSideBarOpen: boolean };
const AuthApp2: React.FunctionComponent<AuthProps> = (props: AuthProps) =>{
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
              <Route path="/teams/:id" element={<TeamInfo />} />
              <Route path="/players" element={<PlayerList />} />
            </Routes>
          </MainContainer>
        </BrowserRouter>
      </div>
  )
}

class AuthApp extends React.Component<AuthProps, AuthState>{
  constructor(props: any){
    super(props);

    this.state={
      mobileSideBarOpen : false,      
    }
    this.toggleMobileSideBar = this.toggleMobileSideBar.bind(this);
  }
  toggleMobileSideBar(isOpen: boolean){
    this.setState({
      mobileSideBarOpen: !isOpen
    });
  }
  

  render() {
    return (
      <div className="app-wrapper">
        <BrowserRouter>
          <Header className="header" toggleMobileSideBar={this.toggleMobileSideBar}/>
          <SideBar isOpen={this.state.mobileSideBarOpen}/>

          <div className="main">
            <Routes>
              <Route path="/" element={<TeamsList />}></Route>
              <Route path="/teams" element={<TeamsList />}></Route>
              <Route path="/teams/:id" element={<TeamInfo />} />
              <Route path="/players" element={<PlayerList />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default AuthApp2;
