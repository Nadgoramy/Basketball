import { combineReducers } from "@reduxjs/toolkit";
import { players } from "../../modules/players/playersReducer";
import {userReducer} from "../redux/userReducer";
import {teams} from "../../modules/teams/teamsReducer";

const rootReducer = combineReducers({
    
    players :players,
    user: userReducer,
    teams: teams
  })
  
  export default rootReducer