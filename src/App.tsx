import React, { createContext, useState } from "react";
import { connect, useSelector } from "react-redux";
import UnauthApp from "modules/interface/UnauthApp";
import AuthService from "api/authService";
import { AppStateType } from "core/redux/configureStore";
import { ThemeProvider } from "styled-components";
import AuthApp from "modules/interface/AuthApp";
import { theme } from "DefaultTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "modules/interface/PageNotFound";
import { TeamsList } from "modules/teams/components/TeamList/teamsList";
import TeamEdit from "modules/teams/components/TeamEdit";
import { TeamInfo } from "modules/teams/components/TeamInfo/teamInfo";
import PlayerEdit from "modules/players/components/playerEdit";
import { PlayerInfo } from "modules/players/components/PlayerInfo";
import { PlayerList } from "modules/players/components/playerList";

function App() {
  const user = AuthService.getCurrentUser();
  const userFromStore = useSelector((state: AppStateType) => state.user);

  console.log(userFromStore);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {!user ?? <UnauthApp />}
        {user && (
          <Routes>
            <Route path="/" element={<AuthApp />} />
            <Route path="teams" element={<AuthApp />}>
              <Route path="edit/:id" element={<TeamEdit />} />
              <Route path=":id" element={<TeamInfo />} />
              <Route index element={<TeamsList />} />
            </Route>
            <Route path="/players" element={<AuthApp />} >
              <Route path="edit/:id" element={<PlayerEdit />} />
              <Route path=":id" element={<PlayerInfo />} />
              <Route index element={<PlayerList />} />           
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
