import UnauthApp from "modules/auth/UnauthApp";
import AuthService from "api/requests/authService";
import { AppStateType } from "core/redux/configureStore";
import { ThemeProvider } from "styled-components";
import AuthApp from "modules/layout/AuthApp";
import { theme } from "DefaultTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "modules/layout/PageNotFound";
import { TeamsList } from "modules/teams/components/teamsList";
import TeamEdit from "modules/teams/components/TeamEdit";
import { TeamInfo } from "modules/teams/components/teamInfo";
import PlayerEdit from "modules/players/components/playerEdit";
import { PlayerInfo } from "modules/players/components/PlayerInfo";
import { PlayerList } from "modules/players/components/playerList";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { userActions } from "core/redux/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const user = AuthService.getCurrentUser();
  const userFromStorage = useAppSelector(
    (state: AppStateType) => state.user.currentUser
  );

  if (!userFromStorage && user) dispatch(userActions.setUser(user));

  const error = useAppSelector((state: AppStateType) => state.error.message);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<UnauthApp />}>
            <Route path="/register" element={<UnauthApp />} />
          </Route>
          <Route path="/teams" element={<AuthApp />}>
            <Route path="edit/:id" element={<TeamEdit />} />
            <Route path=":id" element={<TeamInfo />} />
            <Route index element={<TeamsList />} />
          </Route>
          <Route path="/players" element={<AuthApp />}>
            <Route path="edit/:id" element={<PlayerEdit />} />
            <Route path=":id" element={<PlayerInfo />} />
            <Route index element={<PlayerList />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
