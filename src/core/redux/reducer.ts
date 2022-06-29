import { combineReducers } from "@reduxjs/toolkit";
import playersPageReducer from "modules/players/hooks/playersPageSlice"
import playerReducer from 'modules/players/hooks/playerSlice'
import positionReducer from 'modules/players/hooks/positionSlice'
import teamOptionReducer from 'modules/players/hooks/teamOptionSlice'
import {userReducer} from "core/redux/userReducer";
import teamReducer from 'modules/teams/hooks/teamSlice'
import teamsPageReducer from 'modules/teams/hooks/teamsPageSlice'
import errorRedicer from 'core/redux/errorSlice'

const rootReducer = combineReducers({
    
    user: userReducer,
    players: playersPageReducer,//players,
    player: playerReducer,
    positions: positionReducer,
    teamOptions: teamOptionReducer, 
    teams: teamsPageReducer,//teams,
    team: teamReducer, //team,
    error: errorRedicer
  })
  
  export default rootReducer