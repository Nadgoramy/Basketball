import { combineReducers } from "@reduxjs/toolkit";
import { players, player} from "modules/players/playersReducer";
import {userReducer} from "core/redux/userReducer";
import {teams} from "modules/teams/teamsReducer";
import {team} from 'modules/teams/teamReducer'

const rootReducer = combineReducers({
    
    players: players,
    player: player,
    user: userReducer,
    teams: teams,
    team: team
  })
  
  export default rootReducer