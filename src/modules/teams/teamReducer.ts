import { PlayerDto } from "api/Dto/playerDto"
import { TeamDto } from "api/Dto/teamDto"

export const actionTypes = {
    START_REQUEST : () => ("START_REQUEST"),
    FINISH_REQUEST : () => ("FINISH_REQUEST"),    
    GOT_TEAM: () =>  'GOT_TEAM',   
    ADD_TEAM: () =>  'ADD_TEAM',   
    SET_TEAM: () =>  'SET_TEAM',   
    DELETE_TEAM: () =>  'DELETE_TEAM',
    GOT_TEAM_PLAYERS: ()  => 'GOT_TEAM_PLAYERS'
   }

export const actions = {
    startRequest: () => ({type: actionTypes.START_REQUEST} as const),
    finishRequest:()=>({type: actionTypes.FINISH_REQUEST} as const),
    gotTeam: ( team :TeamDto) => ({ type: actionTypes.GOT_TEAM, team: team } as const),
    addTeam: ( team :TeamDto) => ({ type: actionTypes.ADD_TEAM, team: team } as const),
    setTeam: ( team :TeamDto) => ({ type: actionTypes.SET_TEAM, team: team } as const),
    deleteTeam: ( team :TeamDto) => ({ type: actionTypes.DELETE_TEAM, team: team } as const),
    gotTeamPlayers: ( players: PlayerDto[]) => ({type: actionTypes.GOT_TEAM_PLAYERS, players: players} as const)
}

export type ActionsTypes = {
    type: ()=>string
    team: TeamDto,
    players: PlayerDto[]    
  }

type StateType = {  
      isFetching: boolean        
      team:TeamDto | null
}

const initialState: StateType = {  
  isFetching: false,   
  team: null
}
export function team(
    state = initialState,
    action: ActionsTypes
  ) {
   
    switch (action.type) {      
      case actionTypes.START_REQUEST:{
        return Object.assign({}, state, {
          isFetching: true          
        })
      }
      case actionTypes.FINISH_REQUEST:{
        return Object.assign({}, state, {
          isFetching: false          
        })
      }      
      case actionTypes.GOT_TEAM:
       
        case actionTypes.ADD_TEAM:
        
        case actionTypes.SET_TEAM:
        
        case actionTypes.DELETE_TEAM:
        return Object.assign({}, state, {
          isFetching: false, 
          team: action.team, 
        })         
      default:
        return state
    }
}