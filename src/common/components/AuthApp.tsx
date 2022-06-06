import React from 'react';
import { BrowserRouter,  Route , Routes} from 'react-router-dom';
import {TeamList} from '../../modules/teams/components/teamList';
import { PlayerList} from '../../modules/players/components/playerList';
import SideBar from '../../common/components/SideBar';
import Header from "../../common/components/Header"



class AuthApp extends React.Component{
    render(){
        return (
          
            <div className="App">
              <Header/>
              <SideBar/>
              <BrowserRouter>
                <Routes>
                  <Route path='/'><TeamList/></Route>
                  <Route path='/teams'><TeamList/></Route>                
                  <Route path='/players' element={<PlayerList/>} />
                </Routes>
               </BrowserRouter>
            </div>
         
        );
    }

    
}
//<Route path='/teams/:id' element={<TeamInfo id={id}/>}/>

export default AuthApp;