import { combineReducers } from "@reduxjs/toolkit";
import { players } from "modules/players/playersReducer";
import {userReducer} from "core/redux/userReducer";
import {teams} from "modules/teams/teamsReducer";
import {team} from 'modules/teams/teamReducer'

const rootReducer = combineReducers({
    
    players :players,
    user: userReducer,
    teams: teams,
    team: team
  })
  
  export default rootReducer