import { combineReducers } from "@reduxjs/toolkit";
import playersPageReducer from "modules/players/hooks/playersPageSlice";
import playerReducer from "modules/players/hooks/playerSlice";
import positionReducer from "modules/players/hooks/positionSlice";
import teamOptionReducer from "modules/players/hooks/teamOptionSlice";
import userReducer from "./userSlice";
import teamReducer from "modules/teams/hooks/teamSlice";
import teamsPageReducer from "modules/teams/hooks/teamsPageSlice";

export const rootReducer = combineReducers({
  players: playersPageReducer,
  player: playerReducer,
  positions: positionReducer,
  teamOptions: teamOptionReducer,
  teams: teamsPageReducer,
  team: teamReducer,
  user: userReducer,
});
